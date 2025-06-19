import { Controller, Get } from '@nestjs/common';
import { MealService } from './meal.service';
import { Public } from 'src/SecurityUtils/public.decorator';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Public()
  @Get('/')
  findAll() {
    return this.mealService.findAllMealsForCustomer();
  }
}
