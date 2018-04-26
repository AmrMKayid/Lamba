import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from "../../../app.config";
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {

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
    if (this.currentUser.role == 'Parent' || this.currentUser.role == 'Child') {
      this.router.navigate(['/']);
    }
    this.getBookings();
  }

  Bookings = []
  Descriptions = []
  CreatedAt = []

  getBookings() {
    this.http.get(appConfig.apiUrl + '/booking/getBookings', this.httpOptions).subscribe(
      (res: any) => {
        this.Bookings = res.data;
        var arrayLength = this.Bookings.length;
        for (var i = 0; i < arrayLength; i++) {
          this.Descriptions[i] = this.Bookings[i].description;
          this.CreatedAt[i] = this.Bookings[i].created_at;
        }
      }
      ,(error)=>{
        new Noty({
          type: 'error',
          text: `Something went wrong while retrieving bookings:\n${error.error ? error.error.msg : error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

  Notification = {
    title: "",
    description: "",
    url: "",
    recieving_user_id: "",
  };

  fees: string;
  description: string;
  email: string;

  Accept() {
    this.Notification.title = "New Booking Accepted";
    this.Notification.description = this.description + " is Accepted With fees = " + this.fees;
    this.Notification.url = " ";
    this.http.get(appConfig.apiUrl + '/booking/getId/' + this.email, this.httpOptions).subscribe((res: any) => {
      this.Notification.recieving_user_id = res.data;
      this.http.post(appConfig.apiUrl + '/booking/newNotif', this.Notification, this.httpOptions).subscribe();

      this.fees = "";
      this.email = "";
      this.description = "";

      new Noty({
        type: 'success',
        text: `Booking Accepted Successfully!`,
        timeout: 3000,
        progressBar: true
      }).show();

    });
  }

  Reject() {

    this.Notification.title = "New Booking Rejected";
    this.Notification.description = this.description + " is Rejected because of " + this.fees;
    this.Notification.url = " ";
    this.http.get(appConfig.apiUrl + '/booking/getId/' + this.email, this.httpOptions).subscribe((res: any) => {
      this.Notification.recieving_user_id = res.data;
      this.http.post(appConfig.apiUrl + '/booking/newNotif', this.Notification, this.httpOptions).subscribe();
    });

    this.http.get(appConfig.apiUrl + '/booking/deleteNotif/' + this.description, this.httpOptions).subscribe();

    this.fees = "";
    this.email = "";
    this.description = "";

    new Noty({
      type: 'success',
      text: `Booking Rejected Successfully!`,
      timeout: 3000,
      progressBar: true
    }).show();

  }
}
