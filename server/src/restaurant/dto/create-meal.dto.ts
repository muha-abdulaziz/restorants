import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsBoolean } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  @IsNotEmpty()
  menuId: number;
} 