import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ChatService} from "../../services/chat.service";
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser;
  public role;
  chatCount;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private auth: AuthService, private router: Router, private notificationservice: NotificationService
    , private httpClient: HttpClient, private chat: ChatService) {

  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.currentUser = this.auth.getCurrentUser();
      if (this.auth.getCurrentUser().role)
        this.role = (this.auth.getCurrentUser().role).toLowerCase();
        setInterval(() => {
           this.refresh();
       }, 6000);
    }
  }




refresh()
{
  this.getMyNotifications();
  this.getMyRequests();
  this.chat.getAllChats().subscribe((res:any)=>{
    this.chatCount = res.data.length;
  });
}
  isLoggedIn() {
    return localStorage.getItem('authentication');
  }

  isAdmin() {
    if (this.auth.getCurrentUser().role == 'Admin') {
      return true;
    }
    return false;
  }

  isTeacher() {
    if (localStorage.getItem('authentication')) {
      if (this.auth.getCurrentUser().role == 'Teacher') {
        return true;
      }
    }
    return false;
  }

  logout() {
    this.auth.logout();
  }

  hideNavbar() {
    if (this.router.url == '/profile/admin/dashboard')
      return false;
    if (this.router.url == '/profile/admin/un-verified-articles')
      return false;
    if (this.router.url == '/profile/admin/un-verified-activities')
      return false;
    if (this.router.url == '/profile/admin/verify-teachers')
      return false;
    if (this.router.url == '/profile/admin/add-admin')
      return false;
    if (this.router.url == '/profile/admin/verification-requests')
      return false;
    return true;

  }

  notifications = [];

  getMyNotifications() {
    this.notificationservice.getMyNotifications().subscribe((res: any) => {
      this.notifications = res.data;
    });
  }

  requests = [];

  getMyRequests() {
    this.httpClient.get('http://localhost:3000/api/request/get', this.httpOptions).subscribe(
      (res: any) => {
        this.requests = res.data;
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

  rejectRequest(request) {

    this.httpClient.delete('http://localhost:3000/api/request/deleteRequest/' + request._id, this.httpOptions).subscribe(
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
      url: "/profile/"+request.recievingTeacherId,
      recieving_user_id: request.requestingParentId._id
    };
    this.notificationservice.CreateNotification(notifyParent);
  }

  acceptRequest(request) {
    this.httpClient.post('http://localhost:3000/api/user/addStudent/' + request.childId._id, null, this.httpOptions).subscribe(
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

    this.httpClient.delete('http://localhost:3000/api/request/deleteRequest/' + request._id, this.httpOptions).subscribe(
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
      url: "/profile/"+request.recievingTeacherId,
      recieving_user_id: request.requestingParentId._id
    };
    this.notificationservice.CreateNotification(notifyParent);
  }



}
