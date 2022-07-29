import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateController } from './candidate.controller';
import { Candidate } from './candidate.entity';
import { CandidateService } from './candidate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [CandidateService],
  exports: [CandidateService],
  controllers: [CandidateController],
})
export class CandidateModule {}
