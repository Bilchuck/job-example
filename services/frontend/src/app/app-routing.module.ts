import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillCandidateDataComponent } from './candidates/fill-candidate-data/fill-candidate-data.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: HomePageComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'fill-data',
    component: FillCandidateDataComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
