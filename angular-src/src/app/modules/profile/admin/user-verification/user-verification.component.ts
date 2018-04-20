import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpModule, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
  animations: [routerTransition()]
})
export class UserVerificationComponent implements OnInit {
  public interviewRequests = [];

  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) {
  }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get(appConfig.apiUrl + '/user/viewVerificationForms', {headers: autorization})
      .subscribe((res: any) => {
        this.interviewRequests = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  verifyUser(interviewId, interviewOwner_id) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get(appConfig.apiUrl + '/user/verifyUser/' + interviewOwner_id, {headers: autorization})
      .subscribe((res: any) => {
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    this.httpClient.delete(appConfig.apiUrl + '/user/deleteVerificationForm/' + interviewId, {headers: autorization})
      .subscribe((res: any) => {
        this.ngOnInit()
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    let notification = {
      title: 'Verification',
      description: 'Congratulations:You are now a verified User',
      url: '/profile/' + interviewOwner_id,
      recieving_user_id: interviewOwner_id
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: autorization}).subscribe(
      (res: any) => {
      },
      err => {

      });
  }

  rejectUser(interviewId, interviewOwner_id) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.delete(appConfig.apiUrl + '/user/deleteVerificationForm/' + interviewId, {headers: autorization})
      .subscribe((res: any) => {
        new Noty({
          type: 'success',
          text: "Verification rejected successfully",
          timeout: 3000,
          progressBar: true
        }).show();
        this.ngOnInit();
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    let notification = {
      title: 'Verification',
      description: 'Sorry:You have been rejected',
      url: '/profile/' + interviewOwner_id,
      recieving_user_id: interviewOwner_id
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: autorization}).subscribe(
      (res: any) => {
      },
      err => {

      });
  }

}
