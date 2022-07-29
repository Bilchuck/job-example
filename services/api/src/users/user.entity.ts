import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Candidate } from '../candidate/candidate.entity';

export enum UserType {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ enum: UserType })
  type: UserType;

  @OneToOne(() => Candidate, (candidate) => candidate.user)
  candidate: Candidate;
}
