import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
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
import { OrderStatus } from '../order/order-status.enum-';
import { JwtAuthGuard } from 'src/SecurityUtils/jwt-auth.guard';
import { RolesGuard } from 'src/SecurityUtils/roles.guard';
import { Roles } from 'src/SecurityUtils/role.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService,
    private readonly mealService: MealService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_OWNER)
  @Get('profile/mine')
  async getMyRestaurantProfile(@Request() req): Promise<ApiResponse<Restaurant>> {
    console.log("req.user ->", req.user);
    const restaurant = await this.restaurantService.findRestaurantByOwnerId(req.user.userId);
    return {
      success: true,
      message: 'Restaurant profile retrieved successfully',
      data: restaurant,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_OWNER)
  @Patch('profile/mine')
  async updateMyRestaurantProfile(@Request() req, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<ApiResponse<Restaurant>> {
    const restaurant = await this.restaurantService.updateRestaurantByOwnerId(req.user.id, updateRestaurantDto);
    return {
      success: true,
      message: 'Restaurant profile updated successfully',
      data: restaurant,
    };
  }

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

  @Get(':restaurantId/orders')
  async getOrdersByRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<ApiResponse<any>> {
    try {
    const pageNum = page ? parseInt(page) : 1;
    const sizeNum = pageSize ? parseInt(pageSize) : 10;
    const { orders, total } = await this.restaurantService.getOrdersByRestaurant(restaurantId, pageNum, sizeNum);
    return {
      success: true,
      message: 'Orders retrieved successfully',
      data: { orders, total },
    };
    } catch (error) {
      console.log(error);
      throw error;
    } 
  }

  @Patch(':restaurantId/orders/:orderId')
  async updateOrderStatus(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body('status') status: OrderStatus,
  ): Promise<ApiResponse<any>> {
    const order = await this.restaurantService.updateOrderStatus(restaurantId, orderId, status);
    return {
      success: true,
      message: 'Order status updated successfully',
      data: order,
    };
  }
}
