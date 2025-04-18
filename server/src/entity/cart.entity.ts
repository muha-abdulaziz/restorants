import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from './meal.entity';
import { Customer } from './customer.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Meal, (meals) => meals.cart)
  @JoinColumn()
  meals: Meal[];

  @OneToOne(()=>Customer)
  @JoinColumn()
  customer:Customer
}
