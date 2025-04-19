import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RequestRestaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  restaurantName: string;
  @Column()
  location: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column()
  adminComment: string;

  @OneToOne(() => Restaurant)
  restuarant: Restaurant;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
