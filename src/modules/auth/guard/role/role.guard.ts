// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesHandler = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const rolesClass = this.reflector.get<string[]>(
      'roles',
      context.getClass(),
    );

    const roles = rolesHandler ?? rolesClass;

    if (!roles) {
      return true; // Se não houver roles definidas, permite o acesso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = matchRoles(roles, user.role);

    if (!user || !user.role || !hasRole) {
      return false;
    }

    return true;
  }
}

function matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
  return allowedRoles.some((role) => userRoles?.includes(role));
}
