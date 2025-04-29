import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerRestaurant } from './ownerRestaurant.entity';
import { Menu } from './menu.entity';

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

  @OneToMany(() => Restaurant, (resturant) => resturant.menus)
  menus: Menu;
}
