import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Restaurant } from 'src/entity/restaurant.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    console.log("\ncreateMenuDto ->", createMenuDto, "\n");
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createMenuDto.restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${createMenuDto.restaurantId} not found`);
    }
    const menu = this.menuRepository.create({
      ...createMenuDto,
      restaurant,
    });
    return this.menuRepository.save(menu);
  }

  async findAll(restaurantId: number): Promise<Menu[]> {
    console.log("\nrestaurantId ->", restaurantId, "\n");
    return this.menuRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  async findOne(restaurantId: number, id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id, restaurant: { id: restaurantId } },
      relations: ['meals', 'restaurant'],
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async update(restaurantId: number, id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(restaurantId, id);
    Object.assign(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(restaurantId: number, id: number): Promise<void> {
    const menu = await this.findOne(restaurantId, id);
    await this.menuRepository.remove(menu);
  }
}
