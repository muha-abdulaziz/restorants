import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Public } from 'src/SecurityUtils/public.decorator';
import { Roles } from 'src/SecurityUtils/role.decorator';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Public()
  @Post('delivery')
  addRequestForDelivery(@Body() createRequestDto: any) {
    return this.requestService.addRequestForDelivery(createRequestDto);
  }

  @Public()
  @Post('restaurant')
  addRequestForrestaurant(@Body() createRequestDto: any) {
    return this.requestService.addRequestForRestaurant(createRequestDto);
  }

  @Roles('ADMIN')
  @Patch('restaurant/admin/:id')
  changeStatusForRestuarant(
    @Param('id') id: string,
    @Body() updateRequestDto: any,
  ) {
    return this.requestService.changeStatusForRestuarant(
      +id,
      updateRequestDto,
    );
  }

  @Roles('ADMIN')
  @Patch('delivery/admin/:id')
  changeStatusForDelivery(
    @Param('id') id: string,
    @Body() updateRequestDto: any,
  ) {
    return this.requestService.changeStatusForDeilvery(
      +id,
      updateRequestDto,
    );
  }

  @Roles('ADMIN')
  @Get('delivery/all')
  findAllDelivery() {
    return this.requestService.findAllDelivery();
  }

  @Roles('ADMIN')
  @Get('restaurant/all')
  findAllRestaurant() {
    return this.requestService.findAllRestaurant();
  }
}
