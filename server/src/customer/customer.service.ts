import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Repository } from 'typeorm';
import { Customer } from 'src/entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: Repository<Customer>) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.insert(createCustomerDto);
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
