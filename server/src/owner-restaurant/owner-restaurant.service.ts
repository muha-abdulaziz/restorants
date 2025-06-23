import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerRestaurant } from 'src/entity/ownerRestaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { UserRole } from 'src/user/user-role.enum';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerRestaurantService {
  constructor(
    @InjectRepository(OwnerRestaurant)
    private OwnerRestaurantRepo: Repository<OwnerRestaurant>,
    private userService: UserService,
    @Inject(forwardRef(() => RestaurantService))
    private restaurantService: RestaurantService,
  ) {}

  async findByUserId(userId: number): Promise<OwnerRestaurant> {
    return this.OwnerRestaurantRepo.findOne({ where: { user: { id: userId } } });
  }

  async addNewOwnerResaurant(requestRestaurant) {
    // create user , ownerRestaurant, new restaurant
    const { id, restaurantName, location, username, password, email } =
      requestRestaurant;

    const user = await this.userService.add({
      username,
      password,
      email,
      role: UserRole.RESTAURANT_OWNER,
    });

    const owner = await this.OwnerRestaurantRepo.insert({
      request: id,
      user: user.identifiers[0],
    });

    return this.restaurantService.create({
      name: restaurantName,
      location,
      owner: owner.identifiers[0],
    });
  }
}
