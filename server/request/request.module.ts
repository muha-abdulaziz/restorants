import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestDelivery } from 'src/entity/requestDelivery.entity';
import { RequestRestaurant } from 'src/entity/requestRestaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestDelivery, RequestRestaurant])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
