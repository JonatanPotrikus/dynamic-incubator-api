import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UserPresenter } from 'src/modules/users/presenters/user.presenter';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company.create({ data: createCompanyDto });
  }

  async getUsers(id: number) {
    const users = await this.prisma.user.findMany({
      where: {
        UserCompanies: {
          some: {
            companyId: id,
          },
        },
      },
    });

    return users.map((user) => new UserPresenter(user));
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    await this.prisma.$transaction(async (prisma) => {
      // Delete all users for Company
      await prisma.user.deleteMany({
        where: {
          companyId: id,
        },
      });

      // Delete the Company
      await prisma.company.delete({ where: { id } });
    });

    return { message: 'Company and associated users deleted successfully' };
  }
}
