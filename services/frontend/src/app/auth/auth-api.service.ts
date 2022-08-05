import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class AuthApiService {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private auth: AuthService,
  ) {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    let account = null;
    try {
      if (this.auth.token) {
        account = await firstValueFrom(this.apiService.getCurrentUser())
      }
    } finally {
      this.auth.initAccount(account);
    }
  }

  async login(email: string, password: string) {
    const response = await firstValueFrom(this.apiService.login(email, password));
    if (response.access_token) {
      this.auth.saveToken(response.access_token);
      const me = await firstValueFrom(this.apiService.getCurrentUser());
      this.auth.account$.next(me);
      this.router.navigateByUrl(``);
    }
  }

  async signUp(user: CreateUserDTO) {
    const response = await firstValueFrom(this.apiService.signUp(user));
    if (response.access_token) {
      this.auth.saveToken(response.access_token);
      const me = await firstValueFrom(this.apiService.getCurrentUser());
      this.auth.account$.next(me);
      this.router.navigateByUrl(``);
    }
  }
}
