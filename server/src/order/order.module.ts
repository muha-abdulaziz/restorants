import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { ShipmentModule } from 'src/shipment/shipment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), DeliveryModule, ShipmentModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
