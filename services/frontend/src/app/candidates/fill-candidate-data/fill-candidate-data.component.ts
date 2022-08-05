import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CandidateService } from '../candidate.service';

export enum TechCategory {
  NODE_JS = 'NODE_JS',
  FRONTEND_JS = 'FRONTEND_JS',
  DOT_NET = 'DOT_NET',
  PHP = 'PHP',
  JAVA = 'JAVA',
  OTHER = 'OTHER',
}

@Component({
  selector: 'app-fill-candidate-data',
  templateUrl: './fill-candidate-data.component.html',
  styleUrls: ['./fill-candidate-data.component.scss']
})
export class FillCandidateDataComponent implements OnInit {
  @ViewChild("cvFileUpload", { static: false })
  cvFileUpload!: ElementRef;

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    salary: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    stack: new FormControl<TechCategory | null>('' as any, [Validators.required]),
    experience: new FormControl<string | null>('' as any, [Validators.required]),
    skills: new FormControl<string[]>([], [Validators.required, Validators.minLength(1)]),
    summary: new FormControl<string>('', []),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    phone: new FormControl<string>('', []),
    email: new FormControl<string>('', []),
    skype: new FormControl<string>('', []),
    cv: new FormControl<string>('', [Validators.required]),
  });
  submitted = false;

  stacks = [
    TechCategory.NODE_JS,
    TechCategory.FRONTEND_JS,
    TechCategory.DOT_NET,
    TechCategory.PHP,
    TechCategory.JAVA,
    TechCategory.OTHER,
  ];

  experiences = [
    '0',
    '<1',
    '1',
    '2',
    '3',
    '4',
    '5+',
  ]

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      try {
        const formData = this.getFormData();
        await firstValueFrom(this.candidateService.fillCandidateData(formData));
        this.toastr.success('Candidate data saved!');
        this.router.navigateByUrl('');
      } catch (e: any) {
        this.toastr.error(e.message);
      }
    }
  }
  getFormData() {
    const formData = new FormData();
    formData.append('title', this.form.value.title ?? '');
    formData.append('salary', this.form.value.salary?.toString() ?? '');
    formData.append('stack', this.form.value.stack ?? '');
    formData.append('experience', this.form.value.experience ?? '');
    formData.append('skills', []?.join(',') ?? '');
    formData.append('summary', this.form.value.summary ?? '');
    formData.append('name', this.form.value.name ?? '');
    formData.append('phone', this.form.value.phone ?? '');
    formData.append('email', this.form.value.email ?? '');
    formData.append('skype', this.form.value.skype ?? '');
    formData.append('cv', this.cvFileUpload.nativeElement.files[0], this.cvFileUpload.nativeElement.files[0].name);
    return formData;
  }
}
