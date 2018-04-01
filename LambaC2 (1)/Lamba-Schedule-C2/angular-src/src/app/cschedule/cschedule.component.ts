import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cschedule',
  templateUrl: './cschedule.component.html',
  styleUrls: ['./cschedule.component.css']
})
export class CscheduleComponent implements OnInit {

  public timetable;

  public day = [];
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  constructor(private http: HttpClient) {

  }

  createChildShcedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.post('http://localhost:3000/api/schedule/createChildShcedule/5ac0c3c7adae82c5227d1c78/5ac0c42dadae82c5227d1c79',null ).subscribe((res: any) => {
      this.sat = res.data.saturday;
      this.sun = res.data.sunday;
      this.mon = res.data.monday;
      this.tues = res.data.tuesday;
      this.wed = res.data.wednesday;
      this.thurs = res.data.thursday;
      this.fri = res.data.friday;
    });

  }

  getTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.get('http://localhost:3000/api/schedule/getMySchedule/5ac0c42dadae82c5227d1c79').subscribe((res: any) => {
      this.sat = res.data.table.saturday;
      this.sun = res.data.table.sunday;
      this.mon = res.data.table.monday;
      this.tues = res.data.table.tuesday;
      this.wed = res.data.table.wednesday;
      this.thurs = res.data.table.thursday;
      this.fri = res.data.table.friday;

    });


  }



  ngOnInit() {
    this.getTeacherSchedule();
  }

  fsat() {
    this.day = this.sat;
  }
  fsun() {
    this.day = this.sun;
  }
  fmon() {
    this.day = this.mon;
  }
  ftues() {
    this.day = this.tues;
  }
  fwed() {
    this.day = this.wed;
  }
  fthurs() {
    this.day = this.thurs;
  }
  ffri() {
    this.day = this.fri;
  }


}
