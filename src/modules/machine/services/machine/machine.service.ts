import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMachineDto } from '../../dto/create-machine-body';
import { MachineTypes } from 'src/shared/enums/machine-types';
import { Machine } from '../../dto/machine';

@Injectable()
export class MachineService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.machine.findMany();
  }

  async getById(id: number) {
    console.log('GET BY ID', id);
    return await this.prisma.machine.findUnique({ where: { id } });
  }

  async create(createMachineDto: CreateMachineDto) {
    const { ip } = createMachineDto;

    // Verifica se o IP já está em uso
    const existingMachine = await this.prisma.machine.findUnique({
      where: { ip },
    });

    if (existingMachine) {
      throw new ConflictException(`IP address ${ip} is already in use.`);
    }

    return await this.prisma.machine.create({
      data: createMachineDto,
    });
  }

  async delete(id: number) {
    return await this.prisma.machine.delete({ where: { id } });
  }
}
