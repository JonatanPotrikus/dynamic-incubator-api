import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { LoginDto } from '../../dto/login-dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async doLogin(data: LoginDto) {
    const user: User = await this.userService.findOne(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new Error('Invalid Credentials!');
    }

    const { password, ...result } = user;

    return { access_token: this.jwtService.sign(result) };
  }
}
