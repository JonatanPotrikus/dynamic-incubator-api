import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email for login', example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ description: 'Password for login', example: 'user123' })
  password: string;
}
