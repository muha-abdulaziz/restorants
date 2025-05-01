import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RequestRestaurant } from 'src/entity/requestRestaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDelivery } from 'src/entity/requestDelivery.entity';
import { DeliveryService } from 'src/delivery/delivery.service';
import { OwnerRestaurantService } from 'src/owner-restaurant/owner-restaurant.service';
import { SecurityUtilsService } from 'src/SecurityUtils/security-utils.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestRestaurant)
    private RequestRestaurantRepository: Repository<RequestRestaurant>,
    @InjectRepository(RequestDelivery)
    private RequestDeliveryRepository: Repository<RequestDelivery>,
    private readonly securityUtilsService: SecurityUtilsService,
    private readonly deliveryService: DeliveryService,
    private readonly ownerRestaurantService: OwnerRestaurantService,
  ) {}

  async addRequestForRestaurant(createRequestDto: any) {
    const { email, location, username, restaurantName, password } =
      createRequestDto;

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

    const hashedPassword =
      await this.securityUtilsService.hashPassword(password);

    await this.RequestRestaurantRepository.insert({
      password: hashedPassword,
      location,
      restaurantName,
      username,
      email,
    });
    return 'A new request added';
  }

  async addRequestForDelivery(createRequestDto: any) {
    const {
      email,
      username,
      licensePlate,
      vehicleType,
      drivingLicense,
      password,
    } = createRequestDto;

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

    const hashedPassword =
      await this.securityUtilsService.hashPassword(password);

    await this.RequestDeliveryRepository.insert({
      password: hashedPassword,
      licensePlate,
      vehicleType,
      drivingLicense,
      username,
      email,
    });
    return 'A new request added';
  }

  async changeStatusForRestuarant(requestId: number, updateRequestDto: any) {
    const { status, adminComment } = updateRequestDto;

    if (status !== 'ACCEPTED' && status !== 'REJECTED') {
      throw new HttpException(
        'Failed to process the request : Undefined status',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (status === 'ACCEPTED') {
      const requestRes = await this.RequestRestaurantRepository.findOneBy({
        id: requestId,
      });
      await this.ownerRestaurantService.addNewOwnerResaurant(requestRes);
    }
    await this.RequestRestaurantRepository.update(requestId, {
      status,
      adminComment,
    });

    return 'done';
  }

  async changeStatusForDeilvery(requestId: number, updateRequestDto: any) {
    const { status, adminComment } = updateRequestDto;

    if (status !== 'ACCEPTED' && status !== 'REJECTED') {
      throw new HttpException(
        'Failed to process the request : Undefined status',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (status === 'ACCEPTED') {
      const requestDel = await this.RequestDeliveryRepository.findOneBy({
        id: requestId,
      });
      await this.deliveryService.addNewDeliveryPerson(requestDel);
    }

    await this.RequestDeliveryRepository.update(requestId, {
      status,
      adminComment,
    });

    return 'done';
  }

  findAllRestaurant() {
    return this.RequestRestaurantRepository.find();
  }

  findAllDelivery() {
    return this.RequestDeliveryRepository.find();
  }
}
