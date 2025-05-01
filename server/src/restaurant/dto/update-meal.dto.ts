import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMealDto extends PartialType(CreateMealDto) {
  @IsNumber()
  @IsOptional()
  menuId?: number;
} 