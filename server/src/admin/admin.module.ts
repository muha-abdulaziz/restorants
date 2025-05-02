import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { UserModule } from 'src/user/user.module';
import { SecurityUtilsModule } from 'src/SecurityUtils/security-utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), UserModule, SecurityUtilsModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
