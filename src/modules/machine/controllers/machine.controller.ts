import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMachineDto } from 'src/modules/machine/dto/create-machine-body';
import { MachineService } from '../services/machine/machine.service';
import { AuthGuard } from 'src/modules/auth/guard/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/guard/role/role.guard';

@Controller('machines')
@UseGuards(AuthGuard, RolesGuard)
export class MachineController {
  constructor(private machineService: MachineService) {}

  @Get()
  async getAll() {
    return await this.machineService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.machineService.getById(+id);
  }

  @Post()
  async create(@Body() body: CreateMachineDto) {
    return await this.machineService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.machineService.delete(+id);
  }
}
