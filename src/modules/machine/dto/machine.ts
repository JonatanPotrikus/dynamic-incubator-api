import { MachineConfig, Sensor } from '@prisma/client';
import {
  IsEnum,
  IsIP,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MachineTypes } from 'src/shared/enums/machine-types';

export class Machine {
  @IsNumber()
  id: number;

  @IsString({ message: 'Name must be String' })
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsIP('4', { message: 'IP address must be a valid IPv4 address' })
  ip: string;

  @IsEnum(MachineTypes)
  type: MachineTypes;

  @IsInt()
  @IsOptional()
  companyId?: number;

  @IsOptional()
  configs?: MachineConfig[];

  @IsOptional()
  sensors?: Sensor[];
}
