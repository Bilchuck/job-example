import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { Candidate } from './candidate.entity';

@Injectable()
export class CandidateService {
  constructor(
    private readonly candidateRepository: Repository<Candidate>,
    private minio: MinioService,
  ) {}
}
