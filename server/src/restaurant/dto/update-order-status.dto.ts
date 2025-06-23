import { IsAcceptedOrderStatus } from './order-status.validator';
import { OrderStatus } from 'src/order/order-status.enum-';

export class UpdateOrderStatusDto {
  @IsAcceptedOrderStatus({ message: 'Status must be one of: ACCEPTED, PREPARED, ON_DELIVERY, REJECTED' })
  status: Omit<OrderStatus, 'CANCELLED' | 'PENDING' | 'DELIVERED' >;
} 