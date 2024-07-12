import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/shared/enums/user-roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: string;

  @IsOptional()
  @IsNotEmpty()
  companyId?: number;

  @IsDate()
  @IsOptional()
  createAt: Date;

  @IsDate()
  @IsOptional()
  updateAt: Date;
}
