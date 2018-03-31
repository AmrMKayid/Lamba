import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

//import { ToasterService } from 'angular5-toaster';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tschedule',
  templateUrl: './tschedule.component.html',
  styleUrls: ['./tschedule.component.css']
})
export class TscheduleComponent implements OnInit {

  public timetable;

  public day = [];

  constructor(private http: HttpClient) {

  }

  createTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.post('http://localhost:3000/api/schedule/createTeacherSchedule/5abffbc736680295c461476c',null ).subscribe();

  }

  getTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.get('http://localhost:3000/api/schedule/getTeacherSchedule/5abffbc736680295c461476c').subscribe((res: any) => { this.timetable = res.data.table;
      this.day = this.timetable.saturday;
      console.log(this.day);
    });


  }

  ngOnInit() {
  }

}
