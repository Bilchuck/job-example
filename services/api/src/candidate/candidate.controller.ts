import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateService } from './candidate.service';
import { FillCanndateDataDTO } from './fill-candidate.data.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('fill-candidate-data')
  @UseInterceptors(FileInterceptor('cv'))
  async fillCandidateData(
    @Body() candidateData: FillCanndateDataDTO,
    @UploadedFile() cv: any,
  ) {
    console.log(cv);
    console.log(candidateData);
    // return await this.candidateService.fillCandidateData(candidateData);
  }
}
