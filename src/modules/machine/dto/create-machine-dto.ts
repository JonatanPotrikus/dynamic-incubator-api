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
import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({ description: 'Name of machine', example: 'INCUBATOR 01' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Ip of machine',
    minLength: 3,
    maxLength: 255,
    not: null,
    example: '192.168.0.1',
  })
  @IsIP(4)
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  ip: string;

  @ApiProperty({ enum: MachineTypes })
  @IsEnum(MachineTypes)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  companyId?: number;

  @ApiProperty()
  @IsOptional()
  configs?: MachineConfig[];

  @ApiProperty()
  @IsOptional()
  sensors?: Sensor[];
}
