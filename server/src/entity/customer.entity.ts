import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;

  @OneToOne(() => Cart)
  cart: Cart;
}
