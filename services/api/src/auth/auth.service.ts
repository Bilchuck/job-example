import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { JwtUserData } from './jwt-user-data';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCreds(email, password);
    return user;
  }

  async login(user: User) {
    const payload: JwtUserData = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
