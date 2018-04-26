import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from "../../../app.config";
import { AuthService } from "../../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-teacher',
  templateUrl: './booking-teacher.component.html',
  styleUrls: ['./booking-teacher.component.scss']
})
export class BookingTeacherComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  constructor(public http: HttpClient, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }
  id: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  currentUser: any;
  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.currentUser = this.auth.getCurrentUser();
    if (this.currentUser.role == 'Teacher' || this.currentUser.role == 'Child') {
      this.router.navigate(['/']);
    }
  }

  Notification = {
    title: "",
    description: "",
    url: "",
    recieving_user_id: "",
  };

  Slot: String;

  BookTeacher() {
    if (!this.Slot) {
      new Noty({
        type: 'warning',
        text: `Please enter your desired slot.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }
    this.Notification.title = "New Booking";
    this.Notification.description = "Booking In Slot " + this.Slot + " from Parent " + this.currentUser.email;
    this.Notification.url = "/profile/viewbookings";
    this.Notification.recieving_user_id = this.id;
    this.http.post(appConfig.apiUrl + '/booking/newNotif', this.Notification, this.httpOptions).subscribe(
      res => {
        new Noty({
          type: 'success',
          text: `Teacher is Booked!`,
          timeout: 3000,
          progressBar: true
        }).show();
      },
      err => {
        new Noty({
          type: 'error',
          text: `Something went wrong:\n ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );



  }
}


