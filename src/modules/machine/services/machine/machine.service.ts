import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMachineDto } from '../../dto/create-machine-dto';
import { UpdateMachineDto } from '../../dto/update-machine.dto';

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
    const { companyId, ip, configs, sensors, ...rest } = createMachineDto;

    // Verify IP is already in use
    const existingMachine = await this.prisma.machine.findUnique({
      where: { ip },
    });

    if (existingMachine) {
      throw new ConflictException(`IP address ${ip} is already in use.`);
    }

    return await this.prisma.machine.create({
      data: {
        ...createMachineDto,
        companyId,
        configs: {
          create: configs,
        },
        sensors: {
          create: sensors,
        },
      },
    });
  }

  async update(id: number, updateDto: UpdateMachineDto) {
    const { configs, sensors } = updateDto;

    return this.prisma.machine.update({
      where: { id },
      data: {
        ...updateDto,
        configs: {
          create: configs,
        },
        sensors: {
          create: sensors,
        },
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.machine.delete({ where: { id } });
  }
}
