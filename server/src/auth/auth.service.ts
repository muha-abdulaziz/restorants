import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { SecurityUtilsService } from 'src/SecurityUtils/security-utils.service';
import { UserRole } from 'src/user/user-role.enum';
import { UserService } from 'src/user/user.service';
import { OwnerRestaurantService } from 'src/owner-restaurant/owner-restaurant.service';

@Injectable()
export class AuthService {
  constructor(
    private securityUtilsService: SecurityUtilsService,
    private customerService: CustomerService,
    private userService: UserService,
    private ownerRestaurantService: OwnerRestaurantService,
  ) {}

  /**
   * it login all users based on email
   * @param authDto
   * @returns
   */
  async login(authDto) {
    const { password, email } = authDto;
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.userService.findOne({
      where: { email: normalizedEmail },
    });
    const ERROR_MESSAGE =
      'Login failed. Please verify your email and password and try again.';
    if (!user) {
      throw new HttpException(ERROR_MESSAGE, HttpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await this.securityUtilsService.comparePasswords(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(ERROR_MESSAGE, HttpStatus.UNAUTHORIZED);
    }

    const token = await this.securityUtilsService.generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    let restaurantId = null;
    if (user.role === UserRole.RESTAURANT_OWNER) {
      const owner = await this.ownerRestaurantService.findByUserId(user.id);
      if (owner) {
        restaurantId = owner.id;
      }
    }

    return { access_token: token, role: user.role, username: user.username, userId: user.id, restaurantId };
  }

  // the only customer is able to register
  async register(authDto) {
    const { username, password, email } = authDto;
    const normalizedEmail = email.toLowerCase().trim();
    const userInfo = await this.userService.findOne({
      where: { email: normalizedEmail },
    });

    if (userInfo) {
      throw new HttpException(
        'This email is already registered. Please log in or use a different email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.securityUtilsService.hashPassword(password);
    const customerRole = UserRole.CUSTOMER;
    const user = await this.userService.add({
      username,
      email: normalizedEmail,
      password: hashPassword,
      role: customerRole,
    });

    const userId = user.identifiers[0];

    const customer: any = await this.customerService.create({
      user: userId,
    });

    const token = await this.securityUtilsService.generateToken({
      username,
      id: customer.id,
      role: customerRole,
    });

    return { access_token: token, role: customerRole, username, userId };
  }
}
