import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './order-status.enum-';
import { ShipmentService } from 'src/shipment/shipment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private shipmentService: ShipmentService,
  ) {}
  async findAllPreparedOrders() {
    try {
      const orders = await this.orderRepo
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.meals', 'meal')
        .leftJoin('order.customer', 'customer')
        .addSelect(['customer.id', 'customer.user'])
        .leftJoin('customer.user', 'user')
        .addSelect(['user.username'])
        .where('order.status = :status', { status: OrderStatus.PREPARED })
        .getMany();
      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async orderOnDelivery(orderId, deliveryId) {
    await this.orderRepo.update(orderId, { status: OrderStatus.ON_DELIVERY });
    await this.shipmentService.create({ orderId, deliveryId });
    return 'started to ship the order';
  }

  async checkout(checkoutData) {
    const { mealsIDs, customerId, address } = checkoutData;

    await this.orderRepo.insert({
      customer: customerId,
      meals: mealsIDs,
      address: address,
    });
  }

  async findAllOrdersFOrCustomer(customerId) {
    try {
      const orders = await this.orderRepo
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.meals', 'meal')
        .leftJoin('order.customer', 'customer')
        .addSelect(['customer.id', 'customer.user'])
        .leftJoin('customer.user', 'user')
        .addSelect(['user.username'])
        .where('customer.id = :customerId', { customerId })
        .getMany();
      
      console.log(orders)
      return orders;
    } catch (error) {
      throw new Error("failed to fetch orders")
    }
  }

  async create({
    customerId,
    items,
    address,
  }: {
    customerId: number;
    items: { id: number; restaurantId: number }[];
    address: string;
  }) {
    try {
      // Group items by restaurantId
      const grouped = items.reduce((acc, item) => {
        if (!acc[item.restaurantId]) acc[item.restaurantId] = [];
        acc[item.restaurantId].push(item.id);
        return acc;
      }, {} as Record<number, number[]>);

      // Create an order for each restaurant
      const results = await Promise.all(
        Object.entries(grouped).map(async ([restaurantId, mealIds]) => {
          const order = this.orderRepo.create({
            customer: { id: customerId },
            meals: (mealIds as number[]).map((id) => ({ id })),
            address,
            restaurant: { id: +restaurantId },
          });
          return this.orderRepo.save(order);
        })
      );
      return results;
    } catch (error) {
      throw new Error('failed to order');
    }
  }
}
