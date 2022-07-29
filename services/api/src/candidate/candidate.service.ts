import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { Candidate } from './candidate.entity';

type createCandidate = Omit<Candidate, 'id' | 'registrationStepsFinished'>;
@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private minio: MinioService,
  ) {}

  createCandidate(candidate: createCandidate) {
    return this.candidateRepository.save({
      ...candidate,
      registrationStepsFinished: false,
    });
  }
}
