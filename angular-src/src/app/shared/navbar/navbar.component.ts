import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private auth: AuthService, private router: Router, private notificationservice: NotificationService
              ,private httpClient: HttpClient) {

  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.currentUser = this.auth.getCurrentUser();
      if (this.auth.getCurrentUser().role)
        this.role = (this.auth.getCurrentUser().role).toLowerCase();

        this.getMyNotifications();
        this.getMyRequests();
    }
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

  hideNavbar(){
    if(this.router.url == '/profile/admin/dashboard')
       return false;
    if(this.router.url == '/profile/admin/un-verified-articles')
    return false;
    if(this.router.url == '/profile/admin/un-verified-activities')
    return false;
    if(this.router.url=='/profile/admin/verify-teachers')
    return false;
    if(this.router.url=='/profile/admin/add-admin')
    return false;
    if(this.router.url=='/profile/admin/verification-requests')
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
}
