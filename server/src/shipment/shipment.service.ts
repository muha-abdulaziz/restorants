import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryService } from 'src/delivery/delivery.service';
import { Shipment } from 'src/entity/shipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment) private shipmentRepo: Repository<Shipment>,
    private deliveryService: DeliveryService,
  ) {}
  create(createShipmentDto: any) {
    const { orderId, deliveryId } = createShipmentDto;
    return this.shipmentRepo.insert({ order: orderId, delivey: deliveryId });
  }

  async findAll(userId: number) {
    try {
      const delivery = await this.deliveryService.findByUserId(userId);

      const shipmentsArr = await this.shipmentRepo
        .createQueryBuilder('shipment')
        .leftJoin('shipment.order', 'order')
        .addSelect(['order.id', 'order.address', 'order.customer'])
        .leftJoin('order.customer', 'customer')
        .addSelect(['customer.id', 'customer.user'])
        .leftJoin('customer.user', 'user')
        .addSelect(['user.username', 'user.email'])
        .where('shipment.delivey= :delivey', { delivey: delivery.id })
        .getMany();

      return shipmentsArr;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  update(id: number, updateShipmentDto: any) {
    return this.shipmentRepo.update(id, { status: updateShipmentDto.status });
  }
}
