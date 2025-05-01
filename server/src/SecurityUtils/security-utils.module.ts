import { Module } from '@nestjs/common';
import { SecurityUtilsService } from './security-utils.service';

@Module({
  providers: [SecurityUtilsService],
  exports: [SecurityUtilsService],
})
export class SecurityUtilsModule {}
