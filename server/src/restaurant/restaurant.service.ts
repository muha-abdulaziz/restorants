import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/entity/restaurant.entity';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from '../order/order-status.enum-';
import { OwnerRestaurantService } from 'src/owner-restaurant/owner-restaurant.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Between } from 'typeorm';

@Injectable()
export class RestaurantService {

    constructor(
      @InjectRepository(Restaurant) private restaurantRepo:Repository<Restaurant>,
      @InjectRepository(Order) private orderRepo: Repository<Order>,
      @Inject(forwardRef(() => OwnerRestaurantService))
      private ownerRestaurantService: OwnerRestaurantService,
    ){}

   async create(restaurant:any){
      return await this.restaurantRepo.insert(restaurant)
    }

    async findAll(): Promise<Restaurant[]> {
      return await this.restaurantRepo.find();
    }

    async getOrdersByRestaurant(restaurantId: number, page = 1, pageSize = 10) {
      const [orders, total] = await this.orderRepo.findAndCount({
        where: { restaurant: { id: restaurantId } },
        relations: ['customer', 'customer.user', 'meals', 'meals.menu'],
        order: { createdAt: 'DESC' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return { orders, total };
    }

    async updateOrderStatus(restaurantId: number, orderId: number, status: OrderStatus) {
      const order = await this.orderRepo.findOne({
        where: { id: orderId, restaurant: { id: restaurantId } },
      });
      if (!order) throw new Error('Order not found or does not belong to this restaurant');
      order.status = status;
      return await this.orderRepo.save(order);
    }

    async findRestaurantByOwnerId(userId: number): Promise<Restaurant> {
      const owner = await this.ownerRestaurantService.findByUserId(userId);
      if (!owner) {
        throw new NotFoundException('Restaurant owner not found');
      }
      return this.restaurantRepo.findOne({ where: { owner: { id: owner.id } }, relations: ['owner', 'owner.user'] });
    }
  
    async updateRestaurantByOwnerId(userId: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
      const restaurant = await this.findRestaurantByOwnerId(userId);
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found for the current owner.');
      }
  
      await this.restaurantRepo.update(restaurant.id, updateRestaurantDto);
      return this.findRestaurantByOwnerId(userId);
    }

    async getOrderById(restaurantId: number, orderId: number) {
      return this.orderRepo.findOne({
        where: { id: orderId, restaurant: { id: restaurantId } },
        relations: ['customer', 'customer.user', 'meals', 'meals.menu'],
      });
    }

    async getStatistics(restaurantId: number, from?: string, to?: string) {
      console.log("from ->", from);
      console.log("to ->", to);
      if (from && to && new Date(from) > new Date(to)) {
        [from, to] = [to, from];
      }
      let dateFilter = {};
      if (from && to) {
        dateFilter = { createdAt: Between(new Date(from), new Date(to + 'T23:59:59.999Z')) };
      } else if (from) {
        dateFilter = { createdAt: Between(new Date(from), new Date(from + 'T23:59:59.999Z')) };
      } else if (to) {
        dateFilter = { createdAt: Between(new Date(to), new Date(to + 'T23:59:59.999Z')) };
      }

      const totalOrders = await this.orderRepo.count({ where: { restaurant: { id: restaurantId }, ...dateFilter } });

      const deliveredOrders = await this.orderRepo.find({
        where: { restaurant: { id: restaurantId }, status: OrderStatus.DELIVERED, ...dateFilter },
        relations: ['meals'],
      });
      let totalRevenue = 0;
      for (const order of deliveredOrders) {
        for (const meal of order.meals) {
          totalRevenue += Number(meal.price);
        }
      }

      const activeMenus = await this.restaurantRepo.manager.getRepository('Menu').count({
        where: { restaurant: { id: restaurantId }, isActive: true },
      });

      const totalMeals = await this.restaurantRepo.manager.getRepository('Meal').count({
        where: { menu: { restaurant: { id: restaurantId } } },
      });

      const statusCountsRaw = await this.orderRepo
        .createQueryBuilder('order')
        .select('order.status', 'status')
        .addSelect('COUNT(*)', 'count')
        .where('order.restaurantId = :restaurantId', { restaurantId })
        .andWhere(from || to ? 'order.createdAt BETWEEN :from AND :to' : '1=1', from || to ? { from: from ? new Date(from) : new Date(0), to: to ? new Date(to + 'T23:59:59.999Z') : new Date() } : {})
        .groupBy('order.status')
        .getRawMany();
      const orderStatusCounts: Record<string, number> = {};
      statusCountsRaw.forEach((row: any) => {
        orderStatusCounts[row.status] = Number(row.count);
      });

      return {
        totalOrders,
        totalRevenue,
        activeMenus,
        totalMeals,
        orderStatusCounts,
      };
    }
}
