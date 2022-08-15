import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { IFile } from '../shared/interfaces/file';
import { User } from '../users/user.entity';
import { Candidate } from './candidate.entity';
import { FillCanndateDataDTO } from './fill-candidate.data.dto';

type createCandidate = Pick<Candidate, 'user'>;
@Injectable()
export class CandidateService {
  BUCKET = 'candidates';

  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private minio: MinioService,
  ) {}

  createCandidate(candidate: createCandidate) {
    return this.candidateRepository.save({
      ...candidate,
    });
  }

  async fillCandidateData(
    user: User,
    candidateData: FillCanndateDataDTO,
    cvFile: IFile,
  ) {
    const fileName = `${user.id}-${cvFile.originalname}`;
    await this.minio.saveBufferFile(this.BUCKET, fileName, cvFile.buffer);
    await this.candidateRepository.update({
      user: {
        id: user.id,
      },
    }, {
      title: candidateData.title,
      salary: candidateData.salary,
      experience: candidateData.experience,
      skills: candidateData.skills,
      summary: candidateData.summary,
      stack: candidateData.stack,
      registrationStepsFinished: true,
      contactData: {
        name: candidateData.name,
        phone: candidateData.phone,
        email: candidateData.email,
        skype: candidateData.skype,
        cv: {
          filePath: fileName,
          fileName: cvFile.originalname,
        }
      }
    });
  }
}
