import { Module, ValidationPipe } from '@nestjs/common';
import { MachineController } from './controllers/machine.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MachineService } from './services/machine/machine.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [MachineController],
  providers: [
    PrismaService,
    MachineService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MachineModule {}
