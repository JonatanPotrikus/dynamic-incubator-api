// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enums/user-roles';

export const ROLES_KEY = 'roles';

export const AllowedRoles = (...roles: UserRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
