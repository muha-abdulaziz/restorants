import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiResponse } from '../types/api-response.type';
import { Menu } from '../entity/menu.entity';
import { Restaurant } from '../entity/restaurant.entity';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from '../entity/meal.entity';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService,
    private readonly mealService: MealService,
  ) {}

  @Get()
  async getAllRestaurants(): Promise<ApiResponse<Restaurant[]>> {
    const restaurants = await this.restaurantService.findAll();
    return {
      success: true,
      message: 'Restaurants retrieved successfully',
      data: restaurants,
    };
  }

  @Post('/:restaurantId/menus')
  async createMenu(@Param('restaurantId') restaurantId: number, @Body() createMenuDto: CreateMenuDto): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.create(createMenuDto);
    return {
      success: true,
      message: 'Menu created successfully',
      data: menu,
    };
  }

  @Get('/:restaurantId/menus')
  async findAllMenus(@Param('restaurantId') restaurantId: number): Promise<ApiResponse<Menu[]>> {
    const menus = await this.menuService.findAll(restaurantId);
    return {
      success: true,
      message: 'Menus retrieved successfully',
      data: menus,
    };
  }

  @Get(':restaurantId/menus/:id')
  async findOneMenu(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.findOne(restaurantId, id);
    return {
      success: true,
      message: 'Menu retrieved successfully',
      data: menu,
    };
  }

  @Patch(':restaurantId/menus/:id')
  async updateMenu(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<ApiResponse<Menu>> {
    const menu = await this.menuService.update(restaurantId, id, updateMenuDto);
    return {
      success: true,
      message: 'Menu updated successfully',
      data: menu,
    };
  }

  @Delete(':restaurantId/menus/:id')
  async removeMenu(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.menuService.remove(restaurantId, id);
    return {
      success: true,
      message: 'Menu deleted successfully',
    };
  }

  @Post(':restaurantId/meals')
  async createMeal(@Body() createMealDto: CreateMealDto): Promise<ApiResponse<Meal>> {
    const meal = await this.mealService.create(createMealDto);
    return {
      success: true,
      message: 'Meal created successfully',
      data: meal,
    };
  }

  @Get(':restaurantId/meals')
  async findAllMeals(@Param('restaurantId', ParseIntPipe) restaurantId: number): Promise<ApiResponse<Meal[]>> {
    const meals = await this.mealService.findAll(restaurantId);
    return {
      success: true,
      message: 'Meals retrieved successfully',
      data: meals,
    };
  }

  @Get(':restaurantId/meals/:id')
  async findOneMeal(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Meal>> {
    const meal = await this.mealService.findOne(id);
    return {
      success: true,
      message: 'Meal retrieved successfully',
      data: meal,
    };
  }

  @Get(':restaurantId/menus/:menuId/meals')
  async findMealsByMenu(@Param('menuId', ParseIntPipe) menuId: number): Promise<ApiResponse<Meal[]>> {
    const meals = await this.mealService.findByMenu(menuId);
    return {
      success: true,
      message: 'Meals retrieved successfully',
      data: meals,
    };
  }

  @Patch(':restaurantId/meals/:id')
  async updateMeal(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMealDto: UpdateMealDto,
  ): Promise<ApiResponse<Meal>> {
    const meal = await this.mealService.update(id, updateMealDto);
    return {
      success: true,
      message: 'Meal updated successfully',
      data: meal,
    };
  }

  @Delete(':restaurantId/meals/:id')
  async removeMeal(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.mealService.remove(id);
    return {
      success: true,
      message: 'Meal deleted successfully',
    };
  }
}
