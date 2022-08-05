import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillCandidateDataComponent } from './fill-candidate-data/fill-candidate-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateService } from './candidate.service';



@NgModule({
  declarations: [
    FillCandidateDataComponent
  ],
  providers: [CandidateService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ]
})
export class CandidatesModule { }
