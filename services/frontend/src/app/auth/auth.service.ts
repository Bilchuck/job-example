import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { AuthUser } from './auth-user.interface';

@Injectable()
export class AuthService {
  token: string | null = this.getToken();
  account$ = new BehaviorSubject<AuthUser | null>(null);
  isAuthenticated$ = this.account$.pipe(
    map(account => !!account)
  );
  initiated$ = new BehaviorSubject<boolean>(false);

  initAccount(account: AuthUser | null) {
    this.account$.next(account);
    this.initiated$.next(true);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  removeToken() {
    localStorage.removeItem('token');
    this.token = null;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  logOut() {
    this.removeToken();
    this.account$.next(null);
  }
}
