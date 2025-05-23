import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'src/entity/delivery.entity';
import { UserRole } from 'src/user/user-role.enum';
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

    const user = await this.userService.add({
      username,
      email,
      password,
      role: UserRole.DELIVERY,
    });
    await this.DeliveryRepository.insert({
      user: user.identifiers[0],
      licensePlate,
      vehicleType,
      drivingLicense,
      request: id,
    });
  }

  findAll() {
    return this.DeliveryRepository.createQueryBuilder('delivery')
      .leftJoin('delivery.user', 'user')
      .addSelect(['user.id', 'user.username', 'user.email']);
  }

  findByUserId(id: number) {
    return this.DeliveryRepository.findOne({ where: { user: { id: id } } });
  }
}
