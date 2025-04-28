import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiResponse } from '../types/api-response.type';
import { Meal } from '../entity/meal.entity';

@Controller('meals')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto): Promise<ApiResponse<Meal>> {
    const meal = await this.mealService.create(createMealDto);
    return {
      success: true,
      message: 'Meal created successfully',
      data: meal,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Meal[]>> {
    const meals = await this.mealService.findAll();
    return {
      success: true,
      message: 'Meals retrieved successfully',
      data: meals,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Meal>> {
    const meal = await this.mealService.findOne(id);
    return {
      success: true,
      message: 'Meal retrieved successfully',
      data: meal,
    };
  }

  @Get('menu/:menuId')
  async findByMenu(@Param('menuId', ParseIntPipe) menuId: number): Promise<ApiResponse<Meal[]>> {
    const meals = await this.mealService.findByMenu(menuId);
    return {
      success: true,
      message: 'Meals retrieved successfully',
      data: meals,
    };
  }

  @Patch(':id')
  async update(
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

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.mealService.remove(id);
    return {
      success: true,
      message: 'Meal deleted successfully',
    };
  }
} 