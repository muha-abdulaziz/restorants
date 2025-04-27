import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  add(user) {
    return this.UserRepository.insert(user);
  }
  findOne(option: FindOneOptions<User>) {
    return this.UserRepository.findOne(option);
  }
}
