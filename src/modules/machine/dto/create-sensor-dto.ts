import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  sensorTypeId: number;
}
