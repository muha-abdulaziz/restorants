import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsBoolean,
} from 'class-validator';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @Column({ default: true })
  @IsBoolean()
  isAvailable: boolean;

  @ManyToOne(() => Menu, (menu) => menu.meals, { nullable: false })
  menu: Menu;

  // it will not save order Id
  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Cart)
  cart: Cart;
}
