import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/guard/role/role.guard';
import { AllowedRoles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/shared/enums/user-roles';
import { CompanyAccessGuard } from 'src/shared/guards/company-access.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('companies')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Companies')
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @AllowedRoles(UserRoles.SUPER)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @AllowedRoles(UserRoles.SUPER)
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @UseGuards(CompanyAccessGuard) // Guarda para verificar acesso à empresa
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Get(':id/users')
  async getUsers(@Param('id') id: string) {
    return this.companiesService.getUsers(Number(id));
  }

  @Patch(':id')
  @AllowedRoles(UserRoles.SUPER)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @AllowedRoles(UserRoles.SUPER)
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
