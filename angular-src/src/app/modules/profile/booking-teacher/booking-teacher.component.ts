import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {appConfig} from "../../../app.config";
import {AuthService} from "../../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-teacher',
  templateUrl: './booking-teacher.component.html',
  styleUrls: ['./booking-teacher.component.scss']
})
export class BookingTeacherComponent implements OnInit {
  
  apiUrlHTML = appConfig.apiUrl;
  
  constructor(public http: HttpClient, private auth: AuthService, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  currentUser: any;
  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    if(this.currentUser.role == 'Teacher' || this.currentUser.role == 'Child'){
      this.router.navigate(['/']);
    }
  }

Notification =  {
  title: "",
  description: "",
  url: "",
  recieving_user_id: "",
};

email: string;
Slot: String;
parent: String;

  BookTeacher() {
    this.Notification.title = "New Booking";
    this.Notification.description = "Booking In Slot " + this.Slot + " from Parent " + this.parent ;
    this.Notification.url = "/profile/viewbookings";
    this.http.get(appConfig.apiUrl + '/booking/getId/' + this.email, this.httpOptions).subscribe((res: any) => {
      this.Notification.recieving_user_id = res.data;
      this.http.post(appConfig.apiUrl + '/booking/newNotif', this.Notification, this.httpOptions).subscribe();
    });
    new Noty({
      type: 'success',
      text: `Teacher is Booked!`,
      timeout: 3000,
      progressBar: true
    }).show();
  }
}

