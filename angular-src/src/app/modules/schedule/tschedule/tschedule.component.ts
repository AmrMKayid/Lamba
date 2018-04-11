import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tschedule',
  templateUrl: './tschedule.component.html',
  styleUrls: ['./tschedule.component.css']
})
export class TscheduleComponent implements OnInit {

  public userID;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  public day = [];
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });
  }


  getTeacherSchedule(){
    //let user= JSON.parse(localStorage.getItem('currentUser')).user;

    this.http.get('http://localhost:3000/api/schedule/getTeacherSchedule/5ac015ff36680295c461476e').subscribe((res: any) => {
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



  comment: string;

  commentdata = {
    Comment: "",
    userId: "",
    userType: "",
    taskId: "",
    name:""

  };

  taskname: string;

  description: string;

  taskdata = {
    Title: "",
    Description: "",
    TeacherId: "",
    StudentId: ""
  };

  CreateNewComment() {
    console.log("commented");
    this.commentdata.Comment = this.comment;
    this.comment = "";
    this.commentdata.userType = "Child";
    this.commentdata.userId = "5abfe6f3750ffc19b0689a36";
    this.commentdata.taskId = "5abffe465386b43094a8c784";
    this.commentdata.name = "Saleh";

    this.http.post('http://localhost:3000/api/task/newComment', this.commentdata).subscribe();
  }

  CreateNewTask() {
    console.log("done");
    this.taskdata.Title = this.taskname;
    this.taskname = "";
    this.taskdata.Description = this.description;
    this.description = "";
    this.taskdata.TeacherId = "5abfe6f3750afc19b0689a36";
    this.taskdata.StudentId = "5abffe465388b43094a8c784";

    this.http.post('http://localhost:3000/api/task/newTask', this.taskdata).subscribe();
  }

  mycomment = [];

  getComments() {

    this.http.get('http://localhost:3000/api/task/getComments/5abffe465386b43094a8c784').subscribe((res: any) => {
      this.mycomment = res.data;
      console.log(this.mycomment);
    });
  }
}
