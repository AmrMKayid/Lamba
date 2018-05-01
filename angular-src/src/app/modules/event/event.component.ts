import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  isNotChild: boolean;
  constructor(private auth: AuthService,
    private httpClient: HttpClient) {
  }


  currentUser: any;
  ngOnInit() {
    this.isNotChild = this.auth.getCurrentUser().role !== 'Child';
    this.currentUser = this.auth.getCurrentUser();

    if (this.currentUser.role == "Parent" && this.currentUser.isVerified == false) {
      this.refreshToken();
    }
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
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
      }
    );
  }

}
