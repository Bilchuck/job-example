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

class CandidateCV {
  @Column({ nullable: true })
  filePath?: string;

  @Column({ nullable: true })
  fileName?: string;
}

class CandidateContactData {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  skype?: string;

  @Column(() => CandidateCV)
  cv: CandidateCV;
}

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.candidate)
  @JoinColumn()
  user: User;

  @Column(() => CandidateContactData)
  contactData: CandidateContactData;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  salary?: number;

  @Column({ nullable: true, enum: TechCategory })
  stack?: TechCategory;

  @Column({ nullable: true })
  summary?: string;

  @Column({ nullable: true })
  experience?: string;

  @Column({ nullable: true, type: 'json' })
  skills?: TechSkills[];

  @Column({ default: false })
  registrationStepsFinished: boolean;
}
