import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByCreds(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async createUser(user: CreateUserDTO) {
    const existed = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existed) {
      throw new Error('User already exists');
    }
    const passwordCrypted = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({
      ...user,
      password: passwordCrypted,
    });
  }
}
