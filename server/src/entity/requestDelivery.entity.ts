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
  email: string;

  @Column()
  password: string;

  @Column()
  licensePlate: string;
  @Column()
  vehicleType: string;
  @Column({ unique: true })
  drivingLicense: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({nullable:true})
  adminComment: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => Delivery)
  delivery: Delivery;
}
