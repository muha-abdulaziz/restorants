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
        .leftJoinAndSelect('order.meal', 'meal')
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

}
