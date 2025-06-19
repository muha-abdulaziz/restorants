import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Customer } from 'src/entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: any) {
    return this.customerRepository.insert(createCustomerDto);
  }

  findAll() {
    return this.customerRepository
      .createQueryBuilder('customer')
      .leftJoin('customer.user', 'user')
      .addSelect(['user.id', 'user.username', 'user.email'])
      .getMany();
  }

  findOne(userId: number) {
    return this.customerRepository.findOne({ where: { user: { id: userId } } });
  }

  update(id: number, updateCustomerDto: any) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
