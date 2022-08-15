import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateService } from './candidate.service';
import { FillCanndateDataDTO } from './fill-candidate.data.dto';
import { IFile } from '../shared/interfaces/file';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('fill-candidate-data')
  @UseInterceptors(FileInterceptor('cv'))
  async fillCandidateData(
    @Body() candidateData: FillCanndateDataDTO,
    @CurrentUser() user: User,
    @UploadedFile() cv: IFile,
  ) {
    return await this.candidateService.fillCandidateData(user, candidateData, cv);
  }
}
