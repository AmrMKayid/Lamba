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
          this.getMyUser();
          if (this.isV) {
            this.refreshToken();
            console.log("v");
          }
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

  isV: Boolean;
  getMyUser() {
    this.httpClient.get(appConfig.apiUrl + '/user/getUserByID/' + this.currentUser._id, this.httpOptions)
      .subscribe(
        (res: any) => {
          this.isV = res.data.isVerified;
        }, (err) => {
          new Noty({
            type: 'error',
            text: `Something went wrong while retrieving the user:\n${err.error ? err.error.msg : err.msg}`,
            timeout: 1500,
            progressBar: true
          }).show();
        });
  }


  refreshToken() {
    this.httpClient.post(appConfig.apiUrl + '/auth/refreshTeacherToken', '', { headers: { Authorization: localStorage.getItem('authentication') } }).subscribe(
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
