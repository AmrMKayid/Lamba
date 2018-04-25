import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {appConfig} from "../../app.config";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  constructor(private httpClient: HttpClient,
              private auth: AuthService,
              private notificationservice: NotificationService) {
  }

  requests = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  ngOnInit() {

    this.getMyRequests();

  }

  getMyRequests() {
    this.httpClient.get(appConfig.apiUrl + '/request/get', this.httpOptions).subscribe(
      (res: any) => {
        this.requests = res.data.reverse();
      },
      (err) => {
        new Noty({
          type: 'error',
          text: `Something went wrong while retrieving your requests: ${err.error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

  acceptRequest(request) {
    this.httpClient.post(appConfig.apiUrl + '/user/addStudent/' + request.childId._id, null, this.httpOptions).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: `added child to successfully your students `,
          timeout: 3000,
          progressBar: true
        }).show();
      }, err => {
        new Noty({
          type: 'warning',
          text: `can not accept request: ${err.error.msg}`,
          timeout: 5000,
          progressBar: true
        }).show();
      }
    );

    this.httpClient.delete(appConfig.apiUrl + '/request/deleteRequest/' + request._id, this.httpOptions).subscribe(
      (res: any) => {
        this.requests.splice(this.requests.indexOf(request), 1);
      },
      err => {
        new Noty({
          type: 'warning',
          text: `can not accept request: ${err.error.msg}`,
          timeout: 5000,
          progressBar: true
        }).show();
      }
    );

    var notifyParent = {
      title: "Your request is accepted",
      description: this.auth.getCurrentUser().name.firstName + " " + this.auth.getCurrentUser().name.lastName +
      " accepted your request to add your child " + request.childId.name.firstName + " to his/her students",
      url: "/profile/" + request.recievingTeacherId,
      recieving_user_id: request.requestingParentId._id
    };
    this.notificationservice.CreateNotification(notifyParent);
  }

  rejectRequest(request) {

    this.httpClient.delete(appConfig.apiUrl + '/request/deleteRequest/' + request._id, this.httpOptions).subscribe(
      (res: any) => {
        this.requests.splice(this.requests.indexOf(request), 1);
      },
      err => {
        new Noty({
          type: 'warning',
          text: `can not accept request: ${err.error.msg}`,
          timeout: 5000,
          progressBar: true
        }).show();
      }
    );

    var notifyParent = {
      title: "Your request is rejected",
      description: this.auth.getCurrentUser().name.firstName + " " + this.auth.getCurrentUser().name.lastName +
      " rejected your request to add your child " + request.childId.name.firstName + " to his/her students",
      url: "/profile/" + request.recievingTeacherId,
      recieving_user_id: request.requestingParentId._id
    };
    this.notificationservice.CreateNotification(notifyParent);
  }
}
