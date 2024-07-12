import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { LoginDto } from '../dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  doLogin(@Body() data: LoginDto) {
    return this.authService.doLogin(data);
  }
}
