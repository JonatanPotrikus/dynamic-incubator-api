// company-access.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../enums/user-roles';
import { User } from '@prisma/client';

@Injectable()
export class CompanyAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user.role.includes(UserRoles.SUPER)) {
      return true; // Usuário SUPER pode acessar todas as empresas
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const companyId = +request.params.id;

    return companyId === user.companyId;
  }
}
