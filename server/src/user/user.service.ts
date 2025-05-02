import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { FindOneOptions, Not, Repository } from 'typeorm';
import { UserRole } from './user-role.enum';

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

  findAll() {
   return this.UserRepository.find({
      where: { role: Not(UserRole.ADMIN) },
      select: { username: true, role: true, email: true, id: true },
    });
  }
}
