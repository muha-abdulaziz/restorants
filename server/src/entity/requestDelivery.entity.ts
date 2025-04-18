import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity()
export class RequestDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => Delivery)
  delivery: Delivery;
}
