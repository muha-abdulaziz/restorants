import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Menu } from '../entity/menu.entity';
import { Meal } from '../entity/meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Meal])],
  controllers: [MenuController, MealController],
  providers: [MenuService, MealService],
  exports: [MenuService, MealService],
})
export class MenuModule {}
