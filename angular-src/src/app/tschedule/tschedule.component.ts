import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tschedule',
  templateUrl: './tschedule.component.html',
  styleUrls: ['./tschedule.component.css']
})
export class TscheduleComponent implements OnInit {

  public timetable;


  constructor(private http: HttpClient) {

  }

  createTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;
    this.http.post('http://localhost:3000/api/schedule/createTeacherSchedule/5abfcba336680295c461476a',null).subscribe();
  }

  getTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;
    this.http.get('http://localhost:3000/api/schedule/getTeacherSchedule/5abfcba336680295c461476a').subscribe((res: any) => { this.timetable = res.data; });


  }

  ngOnInit() {
  }

}
