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
  selector: 'app-verify-teacher',
  templateUrl: './verify-teacher.component.html',
  styleUrls: ['./verify-teacher.component.css'],
  animations: [routerTransition()]

})
export class VerifyTeacherComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  public Teachers = [];
  public List=[1];
  authorization = {Authorization: localStorage.getItem('authentication')};


  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) {

  }

  ngOnInit() {
    this.httpClient.get(appConfig.apiUrl + '/admin/teachers_verfication', {headers: this.authorization})
      .subscribe((res: any) => {
        this.Teachers = res.data;
        this.List=res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 2000,
          progressBar: true
        }).show();
      });
  }

  Accept(teacherID) {
    this.httpClient.get(appConfig.apiUrl + '/admin/accept_teacher/' + teacherID, {headers: this.authorization})
      .subscribe(res => {
          new Noty({
            type: 'success',
            text: 'Teacher Verified Successfully',
            timeout: 2000,
            progressBar: true
          }).show();
          this.ngOnInit();
        },
        err => {
          new Noty({
            type: 'error',
            text: err.error ? err.error.msg : err.msg,
            timeout: 2000,
            progressBar: true
          }).show();
        });
    let notification = {
      title: 'Verification',
      description: 'Congratulations:You are now a verified teacher',
      url: '/profile/' + teacherID,
      recieving_user_id: teacherID
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: this.authorization}).subscribe(
      (res: any) => {
      },
      err => {

      });
  }

  Decline(teacherID) {
    this.httpClient.get(appConfig.apiUrl + '/admin/decline_teacher/' + teacherID, {headers: this.authorization})
      .subscribe(res => {
          new Noty({
            type: 'success',
            text: 'Teacher Rejected Successfully',
            timeout: 2000,
            progressBar: true
          }).show();
          this.ngOnInit();
        },
        err => {
          new Noty({
            type: 'error',
            text: err.error ? err.error.msg : err.msg,
            timeout: 2000,
            progressBar: true
          }).show();
        });
    let notification = {
      title: 'Verification',
      description: 'Sorry:You have been rejected',
      url: '/profile/' + teacherID,
      recieving_user_id: teacherID
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: this.authorization}).subscribe(
      (res: any) => {
      },
      err => {

      });

  }
}
