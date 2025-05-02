import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Delivery } from './delivery.entity';
import { shipmentStatus } from 'src/shipment/shipmentStatus.enum';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column({
    type: 'enum',
    enum: shipmentStatus,
    default: shipmentStatus.PENDING,
  })
  status: shipmentStatus;

  @ManyToOne(() => Delivery)
  delivey: Delivery;
}
