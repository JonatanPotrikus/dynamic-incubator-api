import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { AuthGuard } from 'src/modules/auth/guard/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/guard/role/role.guard';
import { AllowedRoles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/shared/enums/user-roles';
import { User } from '@prisma/client';
import { UserDecorator } from 'src/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@AllowedRoles(UserRoles.SUPER, UserRoles.ADMIN)
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('company/:companyId')
  async getUsersByCompany(@Param('companyId') companyId: string) {
    return this.usersService.getUsersByCompany(Number(companyId));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new UserPresenter(user);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return await this.usersService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @UserDecorator() user: User) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
