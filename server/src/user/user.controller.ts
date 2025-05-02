import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/SecurityUtils/role.decorator';
import { UserRole } from './user-role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  fetch() {
    return this.userService.findAll();
  }
}
