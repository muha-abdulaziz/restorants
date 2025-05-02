import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/entity/shipment.entity';
import { DeliveryModule } from 'src/delivery/delivery.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]),DeliveryModule],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports:[ShipmentService]
})
export class ShipmentModule {}
