import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../entity/meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Menu } from '../entity/menu.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const menu = await this.menuRepository.findOne({
      where: { id: createMealDto.menuId },
    });

    if (!menu) {
      throw new NotFoundException(
        `Menu with ID ${createMealDto.menuId} not found`,
      );
    }

    const { menuId, ...mealData } = createMealDto;
    const meal = this.mealRepository.create({
      ...mealData,
      menu,
    });

    return await this.mealRepository.save(meal);
  }

  async findAll(restaurantId: number): Promise<Meal[]> {
    return await this.mealRepository.find({
      where: { menu: { restaurant: { id: restaurantId } } },
    });
  }

  async findOne(id: number): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { id },
    });
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  async update(id: number, updateMealDto: UpdateMealDto): Promise<Meal> {
    const meal = await this.findOne(id);

    if (updateMealDto.menuId) {
      const menu = await this.menuRepository.findOne({
        where: { id: updateMealDto.menuId },
      });

      if (!menu) {
        throw new NotFoundException(
          `Menu with ID ${updateMealDto.menuId} not found`,
        );
      }

      meal.menu = menu;
      delete updateMealDto.menuId;
    }

    Object.assign(meal, updateMealDto);
    return await this.mealRepository.save(meal);
  }

  async remove(id: number): Promise<void> {
    const meal = await this.findOne(id);
    await this.mealRepository.remove(meal);
  }

  async findByMenu(menuId: number): Promise<Meal[]> {
    return await this.mealRepository.find({
      where: { menu: { id: menuId } },
    });
  }

  async findAllMealsForCustomer(): Promise<Meal[]> {
    return await this.mealRepository.find({
      relations: ['menu', 'menu.restaurant']
    });
  }
}
