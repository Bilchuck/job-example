import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from '../users.service';

@Controller('users')
export class UserControllerController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async createUser(@Body() user: CreateUserDTO) {
    await this.userService.createUser(user);
  }
}
