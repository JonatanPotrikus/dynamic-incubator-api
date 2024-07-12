import { UserPresenter } from '../presenters/user.presenter';

export interface PaginatedUsers {
  users: UserPresenter[];
  paginate: {
    totalCount: number;
    totalPages: number;
  }
}
