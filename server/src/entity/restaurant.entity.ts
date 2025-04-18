import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerRestaurant } from './ownerRestaurant.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne(() => OwnerRestaurant)
  @JoinColumn()
  owner: OwnerRestaurant;
}
