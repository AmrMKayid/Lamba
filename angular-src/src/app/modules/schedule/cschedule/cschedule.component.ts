import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-cschedule',
  templateUrl: './cschedule.component.html',
  styleUrls: ['./cschedule.component.css']
})
export class CscheduleComponent implements OnInit {
  public pageid;
  public timetable;

  public day = [];
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private http: HttpClient) {

  }



  getchildSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.get('http://localhost:3000/api/schedule/getChildSchedule/'+ this.pageid , this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.table.saturday;
      this.sun = res.data.table.sunday;
      this.mon = res.data.table.monday;
      this.tues = res.data.table.tuesday;
      this.wed = res.data.table.wednesday;
      this.thurs = res.data.table.thursday;
      this.fri = res.data.table.friday;

    });


  }
  updatechildSchedule(newtitle:string ,newdescription:string , newurl:string , slotid:string ,newday:string){
    let body={
      title : newtitle,
      description : newdescription,
      url : newurl,
      day : newday
    }
    this.http.patch('http://localhost:3000/api/schedule/updateChildSchedule/'+ this.pageid+'/'+slotid , body , this.httpOptions).subscribe();
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
