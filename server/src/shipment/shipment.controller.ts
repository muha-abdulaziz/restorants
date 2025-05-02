import { Controller, Get, Body, Patch, Param, Request } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { Roles } from 'src/SecurityUtils/role.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Roles(UserRole.DELIVERY)
  @Get()
  findAll(@Request() req) {
    const userId = req.user?.userId;
    return this.shipmentService.findAll(userId);
  }

  @Roles(UserRole.DELIVERY)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentDto: any) {
    return this.shipmentService.update(+id, updateShipmentDto);
  }
}
