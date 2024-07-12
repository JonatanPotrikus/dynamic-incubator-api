import { User } from '@prisma/client';

export class UserPresenter {
  constructor(readonly user: User) {}

  toJSON() {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
      createdAt: this.user.createAt,
      updateAt: this.user.updateAt,
      companyId: this.user.companyId,
    };
  }
}
