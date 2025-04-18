import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Delivery } from './delivery.entity';
import { Admin } from './admin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Customer)
  customer: Customer;

  @OneToOne(() => Admin)
  admin: Admin;

  @OneToOne(() => Delivery)
  delivery: Delivery;
}
