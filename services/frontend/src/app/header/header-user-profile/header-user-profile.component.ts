import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header-user-profile',
  templateUrl: './header-user-profile.component.html',
  styleUrls: ['./header-user-profile.component.scss']
})
export class HeaderUserProfileComponent implements OnInit {
  account$ = this.auth.account$;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    // const account = this.authService.account$;
  }

  logOut(e: Event) {
    e.preventDefault();
    this.auth.logOut();
    window.location.reload();
  }

}
