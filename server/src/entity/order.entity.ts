import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shipment } from './shipment.entity';
import { Meal } from './meal.entity';
import { Customer } from './customer.entity';
import { OrderStatus } from 'src/order/order-status.enum-';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: string;

  @Column({ default: 'Cairo' })
  address: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => Shipment)
  shipment: Shipment;

  @OneToMany(() => Meal, (meal) => meal.order)
  meal: Meal[];

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;
}
