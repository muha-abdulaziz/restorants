import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { SecurityUtilsService } from 'src/SecurityUtils/security-utils.service';
import { UserRole } from 'src/user/user-role.enum';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private userService: UserService,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private securtiy: SecurityUtilsService,
  ) {}

  async create() {
    const user = await this.userService.findOne({
      where: { email: 'admin@admin.com' },
    });
    if (!user) {
      const hashedPassword = await this.securtiy.hashPassword('admin1234');

      const userRes = await this.userService.add({
        email: 'admin@admin.com',
        username: 'Mr.Admin',
        password: hashedPassword,
        role: UserRole.ADMIN,
      });

      await this.adminRepo.insert({ user: userRes.identifiers[0] });
    }

    return 'Admin is created';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }
}
