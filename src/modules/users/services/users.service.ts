import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserPresenter } from '../presenters/user.presenter';
import { PaginatedUsers } from '../interfaces/UsersPaginated';
import { SendEmailQueueService } from 'src/modules/send-email/jobs/send-email-queue.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private sendEmailQueueService: SendEmailQueueService,
  ) {}

  // When creating user, make the relationship with Company
  async create(data: CreateUserDto) {
    const { email } = data;

    // Check if email is already in use
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`Email ${data.email} is already in use.`);
    }

    const user = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          ...data,
          password: this.generateHash(data.password),
        },
      });

      if (user) {
        const company = await prisma.userCompanies.create({
          data: {
            companyId: data.companyId,
            userId: user.id,
          },
        });
      }
      return user;
    });

    // Send mail welcome user
    await this.sendEmailQueueService.execute({
      to: email,
      email,
      name: user.name,
      subject: 'Hélice Tech | Welcome 👋🏼',
      text: `Hello, ${user.name}! Welcome to Our Service! Please verify your email by visiting the following link: http://localhost:3000`,
    });

    return user;
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 2,
  ): Promise<PaginatedUsers> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const usersPresenters = users.map((user) => new UserPresenter(user));

    return {
      users: usersPresenters,
      paginate: {
        totalCount,
        totalPages,
      },
    };
  }

  async getUsersByCompany(companyId: number) {
    const users = await this.prisma.user.findMany({
      where: {
        UserCompanies: {
          some: {
            companyId: companyId,
          },
        },
      },
    });
    return users.map((user) => new UserPresenter(user));
  }

  findOne(idOrMail: number | string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        ...(typeof idOrMail === 'number'
          ? { id: idOrMail }
          : { email: idOrMail }),
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
