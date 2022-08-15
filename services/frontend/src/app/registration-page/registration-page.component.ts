import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthApiService } from '../auth/auth-api.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserType } from '../auth/auth-user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(6), Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.minLength(6), Validators.required]),
    type: new FormControl<UserType>(UserType.CANDIDATE, [Validators.required]),
  });
  userTypes = UserType;
  submitted = false;

  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.auth.account$.subscribe((account) => {
      if (account) {
        this.router.navigateByUrl('');
      }
    });
  }

  async onSubmit() {
    this.submitted= true;
    if (this.form.valid) {
      try {
        await this.authApi.signUp({
          email: this.form.controls.email.value as string,
          password: this.form.value.password as string,
          type: this.form.value.type as UserType,
        });
        this.toastr.success('Successfully registered');
      } catch (e: any) {
        this.toastr.error(e.message);
      }
    }
  }

}
