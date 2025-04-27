import { Module } from '@nestjs/common';
import { OwnerRestaurantService } from './owner-restaurant.service';
import { OwnerRestaurantController } from './owner-restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { OwnerRestaurant } from 'src/entity/ownerRestaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OwnerRestaurant]),
    UserModule,
    RestaurantModule,
  ],
  controllers: [OwnerRestaurantController],
  providers: [OwnerRestaurantService],
  exports: [OwnerRestaurantService],
})
export class OwnerRestaurantModule {}
