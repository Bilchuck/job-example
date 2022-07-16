import { Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';

@Controller('users')
export class UserControllerController {
  @Post('sign-up')
  createUser(
    @Body() user: CreateUserDTO,
  ): string {
    return 'This action adds a new user';
  }
}
