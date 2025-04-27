import { Controller } from '@nestjs/common';
import { OwnerRestaurantService } from './owner-restaurant.service';

@Controller('owner-restaurant')
export class OwnerRestaurantController {
  constructor(private readonly ownerRestaurantService: OwnerRestaurantService) {}
}
