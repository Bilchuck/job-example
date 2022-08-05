import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authGuard();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.authGuard();
  }

  private authGuard(): Observable<boolean | UrlTree> {
    return this.auth.initiated$.pipe(
      filter(initiated => !!initiated),
      map(() => !!this.auth.account$.value)
    );
  }
}
