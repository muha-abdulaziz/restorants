import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'src/entity/delivery.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private DeliveryRepository: Repository<Delivery>,
    private readonly userService: UserService,
  ) {}

  async addNewDeliveryPerson(requestDelivery) {
    const {
      id,
      username,
      email,
      password,
      licensePlate,
      vehicleType,
      drivingLicense,
    } = requestDelivery;

    const user = await this.userService.add({ username, email, password });
    await this.DeliveryRepository.insert({
      user: user.identifiers[0],
      licensePlate,
      vehicleType,
      drivingLicense,
      request: id,
    });
  }

  find() {
    return this.DeliveryRepository.find();
  }
}
