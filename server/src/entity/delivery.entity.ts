import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RequestDelivery } from './requestDelivery.entity';
import { User } from './user.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RequestDelivery)
  @JoinColumn()
  request: RequestDelivery;

  @OneToOne(() => User, (user) => user.delivery)
  @JoinColumn()
  user: User;
}
