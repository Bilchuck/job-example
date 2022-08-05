import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FillCandateDataDTO } from './fill-candidate-data.dto';

@Injectable()
export class CandidateService {
  constructor(
    private api: ApiService,
  ) {}

  fillCandidateData(candidateData: FormData) {
    return this.api.fillCandidateData(candidateData);
  }
}
