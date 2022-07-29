import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UserType } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CandidateService } from '../candidate/candidate.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private candidateService: CandidateService,
  ) {}

  async findByCreds(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true },
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
    const savedUser = await this.userRepository.save({
      ...user,
      password: passwordCrypted,
    });
    if (user.type === UserType.CANDIDATE) {
      await this.candidateService.createCandidate({
        user: savedUser,
      });
    }
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['candidate'],
    });
  }
}
