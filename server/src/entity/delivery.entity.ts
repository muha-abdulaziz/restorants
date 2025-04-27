import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequestDelivery } from './requestDelivery.entity';
import { User } from './user.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RequestDelivery)
  @JoinColumn()
  request: RequestDelivery;

  @Column()
  licensePlate: string;
  @Column()
  vehicleType: string;
  @Column({ unique: true })
  drivingLicense: string;

  @OneToOne(() => User, (user) => user.delivery)
  @JoinColumn()
  user: User;
}
