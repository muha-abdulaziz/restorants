import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { Order } from './order.entity';
import { Cart } from './cart.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Menu)
  menu: Menu;

  // it will not save order Id
  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(()=>Cart)
  cart:Cart
}
