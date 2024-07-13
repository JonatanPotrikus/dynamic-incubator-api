import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMachineDto } from 'src/modules/machine/dto/create-machine-dto';
import { MachineService } from '../services/machine/machine.service';
import { AuthGuard } from 'src/modules/auth/guard/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/guard/role/role.guard';
import { UpdateMachineDto } from '../dto/update-machine.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMachineDto) {
    return this.machineService.update(+id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.machineService.delete(+id);
  }
}
