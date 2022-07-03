import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.minLength(6), Validators.required]),
  });
  submitted = false;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted= true;
    if (this.form.valid) {
      console.log(this.form);
    }
  }
}
