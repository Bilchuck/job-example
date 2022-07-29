import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../user.entity';

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(UserType)
  type: UserType;
}
