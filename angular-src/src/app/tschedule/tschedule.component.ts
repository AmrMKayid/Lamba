import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ToasterService } from 'angular5-toaster';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tschedule',
  templateUrl: './tschedule.component.html',
  styleUrls: ['./tschedule.component.css']
})
export class TscheduleComponent implements OnInit {

  public timetable;
  public sat = [];

  constructor(private http: HttpClient,
              private toaster: ToasterService) {

  }

  createTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;
    this.http.post('http://localhost:3000/api/schedule/createTeacherSchedule/'+ user._id).subscribe(res => {
      this.toaster.pop({
        type: 'Success',
        title: "Success!",
        body: "Schedule created successfully ;)",
        timeout: 3000
      });
    });
  }

  getTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;
    this.http.get('http://localhost:3000/api/schedule/getTeacherSchedule/'+ user._id).subscribe((res: any) => { this.timetable = res.data; });
     sat = this.timetable.saturday;

  }

  ngOnInit() {
  }

}
