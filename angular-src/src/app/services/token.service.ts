import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { appConfig } from '../app.config';


@Injectable()
export class TokenService {
  tokenHelper: JwtHelperService;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.tokenHelper = new JwtHelperService();
  }

  logoutIfExpired() {
    if (this.tokenHelper.isTokenExpired(localStorage.getItem('authentication'))) {
      localStorage.clear();
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

  refreshToken(days) {
    let daysLeft = Math.floor((this.tokenHelper.getTokenExpirationDate(localStorage.getItem('authentication')).getTime()
      - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysLeft < days) {
      this.httpClient.post(appConfig.apiUrl + '/auth/refresh', '', { headers: { Authorization: localStorage.getItem('authentication') } }).subscribe(
        (res: any) => {
          localStorage.setItem('authentication', res);
        },
        err => {
          new Noty({
            type: 'error',
            text: 'Something went wrong, please re-login',
            timeout: 3000,
            progressBar: true
          }).show();
          localStorage.clear();
          this.router.navigate(['login']);
        }
      );
    }
  }
}
