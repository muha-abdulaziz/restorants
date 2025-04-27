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

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('delivery')
  addRequestForDelivery(@Body() createRequestDto: any) {
    return this.requestService.addRequestForDelivery(createRequestDto);
  }

  @Post('restaurant')
  addRequestForrestaurant(@Body() createRequestDto: any) {
    return this.requestService.addRequestForRestaurant(createRequestDto);
  }

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

  @Get('delivery/all')
  findAllDelivery() {
    return this.requestService.findAllDelivery();
  }

  @Get('restaurant/all')
  findAllRestaurant() {
    return this.requestService.findAllRestaurant();
  }
}
