import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unit: string;
}
