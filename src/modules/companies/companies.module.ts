import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}
