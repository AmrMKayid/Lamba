declare var require: any
require('../assets/chatbot.js');
import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  currentUser: any;

  constructor(private tokenService: TokenService,
    private router: Router,
    private auth: AuthService,
    private httpClient: HttpClient) {

    router.events.subscribe((val) => {
      this.currentUser = this.auth.getCurrentUser();
      if (val instanceof NavigationStart) {
        var isLoggedIn = Boolean(localStorage.getItem('authentication') != null);
        if (isLoggedIn && this.currentUser.role && this.currentUser.role == "Teacher" && this.currentUser.isVerified == false) {
            this.refreshToken();
        }
      }
    });

  }

  ngOnInit() {
    if (localStorage.getItem('authentication')) {
      if (!this.tokenService.logoutIfExpired()) {
        this.tokenService.refreshToken(7);
      }
    }
  }

  refreshToken() {
    this.httpClient.post(appConfig.apiUrl + '/auth/refreshUserToken', '', { headers: { Authorization: localStorage.getItem('authentication') } }).subscribe(
      (res: any) => {
        localStorage.setItem('authentication', res.data);
      },
      err => {
        new Noty({
          type: 'error',
          text: 'Something went wrong, please re-login',
          timeout: 3000,
          progressBar: true
        }).show();
        localStorage.clear();
        window.location.href = 'login';
      }
    );
  }
}
