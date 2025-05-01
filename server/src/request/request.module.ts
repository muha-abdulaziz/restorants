import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestDelivery } from 'src/entity/requestDelivery.entity';
import { RequestRestaurant } from 'src/entity/requestRestaurant.entity';
import { OwnerRestaurantModule } from 'src/owner-restaurant/owner-restaurant.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { SecurityUtilsModule } from 'src/SecurityUtils/security-utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestDelivery, RequestRestaurant]),
    SecurityUtilsModule,
    OwnerRestaurantModule,
    DeliveryModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
