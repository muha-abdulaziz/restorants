import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/SecurityUtils/role.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { DeliveryService } from 'src/delivery/delivery.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly deliveryService: DeliveryService,
  ) {}

  @Roles(UserRole.DELIVERY)
  @Get('/prepared')
  findAllPreparedOrders() {
    console.log('hi');
    return this.orderService.findAllPreparedOrders();
  }

  @Roles(UserRole.DELIVERY)
  @Patch('/accept/:orderId')
  async orderOnDelivery(@Param('orderId') orderId: string, @Request() req) {
    const userId = req.user?.userId;
    const delivery = await this.deliveryService.findByUserId(userId);
    return this.orderService.orderOnDelivery(orderId, delivery.id);
  }
}
