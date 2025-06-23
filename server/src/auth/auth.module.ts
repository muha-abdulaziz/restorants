import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecurityUtilsModule } from 'src/SecurityUtils/security-utils.module';
import { CustomerModule } from 'src/customer/customer.module';
import { UserModule } from 'src/user/user.module';
import { OwnerRestaurantModule } from 'src/owner-restaurant/owner-restaurant.module';

@Module({
  imports: [SecurityUtilsModule , CustomerModule , UserModule, OwnerRestaurantModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
