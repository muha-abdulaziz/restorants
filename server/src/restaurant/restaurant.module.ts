import { Module, forwardRef } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/entity/restaurant.entity';
import { MenuService } from './menu.service';
import { MealService } from './meal.service';
import { Menu } from 'src/entity/menu.entity';
import { Meal } from 'src/entity/meal.entity';
import { MealController } from './meal.controller';
import { Order } from 'src/entity/order.entity';
import { OwnerRestaurantModule } from 'src/owner-restaurant/owner-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Menu, Meal, Order]),
    forwardRef(() => OwnerRestaurantModule),
  ],
  controllers: [RestaurantController,MealController],
  providers: [RestaurantService, MenuService, MealService],
  exports: [RestaurantService, MenuService, MealService],
})
export class RestaurantModule {}
