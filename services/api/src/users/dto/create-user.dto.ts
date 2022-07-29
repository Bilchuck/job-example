import { UserType } from '../user.entity';

export class CreateUserDTO {
  email: string;
  password: string;
  type: UserType;
}
