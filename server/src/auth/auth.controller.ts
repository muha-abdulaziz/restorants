import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from 'src/SecurityUtils/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() createAuthDto:any) {
    return this.authService.login(createAuthDto);
  }

  @Public()
  @Post('/register')
  register(@Body() createAuthDto:any) {
    return this.authService.register(createAuthDto);
  }
}
