import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Delivery } from './delivery.entity';
import { Admin } from './admin.entity';
import { UserRole } from 'src/user/user-role.enum';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default:UserRole.CUSTOMER
  })
  role: UserRole;

  @OneToOne(() => Customer)
  customer: Customer;

  @OneToOne(() => Admin)
  admin: Admin;

  @OneToOne(() => Delivery)
  delivery: Delivery;
}
