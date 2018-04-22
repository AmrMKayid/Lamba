import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {appConfig} from "../../../app.config";
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
    if(this.currentUser.role == 'Parent' || this.currentUser.role == 'Child'){
      this.router.navigate(['/']);
    }
        this.getBookings();
  }

  Bookings = []
  Descriptions = []
  CreatedAt = []  

  getBookings(){
    this.http.get(appConfig.apiUrl + '/booking/getBookings', this.httpOptions).subscribe((res: any) => {
      this.Bookings = res.data;
      var arrayLength = this.Bookings.length;
      for (var i = 0; i < arrayLength; i++) {
        this.Descriptions[i] = this.Bookings[i].description;
        this.CreatedAt[i] = this.Bookings[i].created_at;
      }      
    });
  }

}
