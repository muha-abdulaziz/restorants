import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/SecurityUtils/role.decorator';
import { UserRole } from 'src/user/user-role.enum';
import { DeliveryService } from 'src/delivery/delivery.service';
import { CustomerService } from 'src/customer/customer.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly deliveryService: DeliveryService,
    private readonly customerService: CustomerService,
  ) {}

  @Roles(UserRole.DELIVERY)
  @Get('/prepared')
  findAllPreparedOrders() {
    console.log('hi');
    return this.orderService.findAllPreparedOrders();
  }

  @Roles(UserRole.CUSTOMER)
  @Get('/all')
  async findAllOrders(@Request() req) {
    const userId = req.user?.userId;
    const customer = await this.customerService.findOne(userId);
    return this.orderService.findAllOrdersFOrCustomer(customer.id);
  }

  @Roles(UserRole.DELIVERY)
  @Patch('/accept/:orderId')
  async orderOnDelivery(@Param('orderId') orderId: string, @Request() req) {
    const userId = req.user?.userId;
    const delivery = await this.deliveryService.findByUserId(userId);
    return this.orderService.orderOnDelivery(orderId, delivery.id);
  }

  @Roles(UserRole.CUSTOMER)
  @Post('/new')
  async createNewOrder(@Body() body: any, @Request() req) {
    try {
      const userId = req.user?.userId;
      const customer = await this.customerService.findOne(userId);
      const items = body.items; // [{id, restaurantId}]
      const address = body.address;
      const customerId = customer.id;
      return this.orderService.create({ customerId, items, address });
    } catch (error) {
      return new HttpException(
        'Failed to order the meals',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
