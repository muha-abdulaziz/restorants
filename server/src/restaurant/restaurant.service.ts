import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/entity/restaurant.entity';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from '../order/order-status.enum-';
import { OwnerRestaurantService } from 'src/owner-restaurant/owner-restaurant.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

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
        relations: ['customer', 'meals', 'meals.menu'],
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
}
