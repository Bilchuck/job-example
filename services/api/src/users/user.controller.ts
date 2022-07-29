import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async createUser(@Body() user: CreateUserDTO) {
    await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
