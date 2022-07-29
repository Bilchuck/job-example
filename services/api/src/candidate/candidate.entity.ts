import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum TechCategory {
  NODE_JS = 'NODE_JS',
  FRONTEND_JS = 'FRONTEND_JS',
  DOT_NET = 'DOT_NET',
  PHP = 'PHP',
  JAVA = 'JAVA',
  OTHER = 'OTHER',
}

// TODO
export type TechSkills = string;

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.candidate)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  salary?: number;

  @Column({ nullable: true })
  resume?: string;

  @Column({ nullable: true, enum: TechCategory })
  category?: TechCategory;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true, type: 'json' })
  skills?: TechSkills[];

  @Column()
  registrationStepsFinished: boolean;
}
