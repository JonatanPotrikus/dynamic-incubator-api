import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from '../users/services/users.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UsersService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}