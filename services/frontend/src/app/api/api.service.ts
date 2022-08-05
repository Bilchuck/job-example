import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthUser, UserType } from '../auth/auth-user.interface';
import { CreateUserDTO } from '../auth/create-user.dto';
import { FillCandateDataDTO } from '../candidates/fill-candidate-data.dto';

interface LoginResponse {
  access_token: string;
}
@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(environment.API_URL + '/auth/login', { email, password });
  }

  signUp(user: CreateUserDTO) {
    return this.http.post<LoginResponse>(environment.API_URL + '/sign-up', user);
  }

  getCurrentUser() {
    return this.http.get<AuthUser>(environment.API_URL + '/me');
  }

  fillCandidateData(candidateData: FormData) {
    return this.http.post<null>(
      environment.API_URL + '/candidate/fill-candidate-data',
      candidateData,
    );
  }
}
