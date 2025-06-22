import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/entity/restaurant.entity';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from '../order/order-status.enum-';

@Injectable()
export class RestaurantService {

    constructor(
      @InjectRepository(Restaurant) private restaurantRepo:Repository<Restaurant>,
      @InjectRepository(Order) private orderRepo: Repository<Order>
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
        relations: ['customer', 'meal', 'meal.menu', 'shipment'],
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
}
