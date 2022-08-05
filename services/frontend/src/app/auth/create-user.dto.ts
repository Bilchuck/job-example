import { UserType } from './auth-user.interface';

export interface CreateUserDTO {
  email: string;
  password: string;
  type: UserType;
}
