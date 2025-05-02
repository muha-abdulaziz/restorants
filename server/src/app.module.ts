import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestModule } from 'src/request/request.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OwnerRestaurantModule } from './owner-restaurant/owner-restaurant.module';
import { DeliveryModule } from './delivery/delivery.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './SecurityUtils/jwt-auth.guard';
import { RolesGuard } from './SecurityUtils/roles.guard';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/./entity/*.entity{.ts,.js}'],
        logger: 'simple-console',
        logging: true,
        synchronize: true,
      }),
    }),
    RequestModule,
    RestaurantModule,
    OwnerRestaurantModule,
    DeliveryModule,
    UserModule,
    AuthModule,
    CustomerModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private Adminservice: AdminService) {}

  onApplicationBootstrap() {
    this.Adminservice.create();
  }
}
