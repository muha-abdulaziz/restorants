import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestRestaurant } from 'src/entity/requestRestaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDelivery } from 'src/entity/requestDelivery.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestRestaurant)
    private RequestRestaurantRepository: Repository<RequestRestaurant>,
    @InjectRepository(RequestDelivery)
    private RequestDeliveryRepository: Repository<RequestDelivery>,
  ) {}

  async addRequestForRestuarant(createRequestDto: any) {
    const { email, location, username, restaurantName } = createRequestDto;

    const restuarantReq = await this.RequestRestaurantRepository.findOne({
      where: { restaurantName },
    });

    if (restuarantReq && restuarantReq.status === 'REJECTED') {
      throw new HttpException(
        restuarantReq.adminComment,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (restuarantReq && restuarantReq.status === 'PENDING') {
      throw new HttpException(
        'You have already created request.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (restuarantReq && restuarantReq.status === 'ACCEPTED') {
      throw new HttpException(
        'You have already a restuarant.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.RequestRestaurantRepository.insert({
      location,
      restaurantName,
      username,
      email,
    });
    return 'A new request added';
  }

  async addRequestForDelivery(createRequestDto: any) {
    const { email, username, licensePlate, vehicleType, drivingLicense } =
      createRequestDto;

    const deliveryReq = await this.RequestDeliveryRepository.findOne({
      where: { drivingLicense },
    });

    if (deliveryReq && deliveryReq.status === 'REJECTED') {
      throw new HttpException(deliveryReq.adminComment, HttpStatus.BAD_REQUEST);
    }
    if (deliveryReq && deliveryReq.status === 'PENDING') {
      throw new HttpException(
        'You have already created request.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (deliveryReq && deliveryReq.status === 'ACCEPTED') {
      throw new HttpException(
        'You have already a delivery account.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.RequestDeliveryRepository.insert({
      licensePlate,
      vehicleType,
      drivingLicense,
      username,
      email,
    });
    return 'A new request added';
  }

  findAll() {
    return `This action returns all request`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
