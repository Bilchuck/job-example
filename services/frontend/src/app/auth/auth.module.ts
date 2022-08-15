import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { ApiModule } from '../api/api.module';
import { AuthApiService } from './auth-api.service';
import { AuthTokenHttpInterceptor } from './auth-token.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './loggedIn.guard';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    AuthApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenHttpInterceptor,
      multi: true
    }
  ],
})
export class AuthModule {
  constructor(
    private authApi: AuthApiService,
  ) {}
}