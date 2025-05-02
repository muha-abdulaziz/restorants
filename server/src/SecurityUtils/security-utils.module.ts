import { Module } from '@nestjs/common';
import { SecurityUtilsService } from './security-utils.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [SecurityUtilsService, JwtStrategy],
  exports: [SecurityUtilsService],
})
export class SecurityUtilsModule {}
