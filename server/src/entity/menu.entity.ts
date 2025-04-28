import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Meal } from './meal.entity';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

@Entity()
export class Menu {
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

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description_en: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description_ar: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @OneToMany(() => Meal, meal => meal.menu)
  meals: Meal[];
}
