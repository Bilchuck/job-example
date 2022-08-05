import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../auth/auth-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(6), Validators.required]),
  });
  submitted = false;


  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.account$.subscribe((account) => {
      if (account) {
        this.router.navigateByUrl('');
      }
    });
  }

  async onSubmit() {
    this.submitted= true;
    if (this.form.valid) {
      await this.authApi.login(
        this.form.controls.email.value as string,
        this.form.value.password as string,
      )
    }
  }
}
