import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecurityUtilsModule } from 'src/SecurityUtils/security-utils.module';

@Module({
  imports: [SecurityUtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
