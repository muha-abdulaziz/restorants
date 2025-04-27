import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RequestRestaurant } from './requestRestaurant.entity';
import { Restaurant } from './restaurant.entity';
import { User } from './user.entity';

@Entity()
export class OwnerRestaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RequestRestaurant)
  @JoinColumn()
  request: RequestRestaurant;

  @OneToOne(() => Restaurant)
  restaurant: Restaurant;

  @OneToOne(()=>User)
  @JoinColumn()
  user:User
}
