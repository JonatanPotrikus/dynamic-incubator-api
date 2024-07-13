import { MachineConfig, Sensor } from '@prisma/client';
import {
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';
import { MachineTypes } from 'src/shared/enums/machine-types';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIP(4)
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  ip: string;

  @IsEnum(MachineTypes)
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  companyId?: number;

  @IsOptional()
  configs?: MachineConfig[];

  @IsOptional()
  sensors?: Sensor[];
}
