import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService) { }

  taskId: String;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };


  title: String;
  description: String;
  createdAt: Date;
  updatedAt: Date;
  comments: any;
  studentId: String;
  teacherId: String;
  taskComments: any;
  currentUser: any;

  ngOnInit() {

    this.currentUser = this.auth.getCurrentUser();
    this.route.queryParams.subscribe(params => {
      this.taskId = params['id'];
    });

    this.getTask();
  }


  getTask() {
    this.http.get('http://localhost:3000/api/task/getTask/' + this.taskId, this.httpOptions).subscribe((res: any) => {
      this.title = res.title;
      this.description = res.description;
      this.createdAt = res.createdAt;
      this.updatedAt = res.updatedAt;
      this.comments = res.comments;
      this.studentId = res.studentId;
      this.teacherId = res.teacherId;
      console.log(res);
    });
  }

  getComments() {
    this.http.get('http://localhost:3000/api/task/getComments/' + this.taskId).subscribe((res: any) => {
      this.taskComments = res.data;
    });
  }



  createNewComment(comment) {
    var commentData = {
      Comment: comment,
      userId: this.currentUser.type,
      userType: this.currentUser.id,
      taskId: this.taskId,
      name: this.currentUser.firstName +' ' + this.currentUser.lastName
    };
    this.http.post('http://localhost:3000/api/task/newComment',commentData,this.httpOptions).subscribe();
  }

















  // Tasks = []
  // TasksTitles = []
  // TasksDescriptions = []
  // TasksTeachers = []
  // TasksCreatedAt = []
  // TasksUpdatedAt = []
  // Teacher = []
  // getTasks(childId){
  //   this.http.get("http://localhost:3000/api/task/getTasks/" + childId).subscribe((res: any) => {
  //     this.Tasks = res.data;
  //     // console.log(this.Tasks[0].Title);
  //     var arrayLength = this.Tasks.length;
  //     for (var i = 0; i < arrayLength; i++) {
  //       this.TasksTitles[i] = this.Tasks[i].Title;
  //       this.TasksDescriptions[i] = this.Tasks[i].Description;
  //       this.TasksCreatedAt[i] = this.Tasks[i].createdAt;
  //       this.TasksUpdatedAt[i] = this.Tasks[i].updatedAt;
  //       this.http.get('http://localhost:3000/api/task/getTeacher/' + this.Tasks[i].TeacherId)
  //       .subscribe((res: any) => { this.TasksTeachers[i] = res.data;
  //         var arrayLength2 = this.TasksTeachers.length;
  //         for (var i = 0; i < arrayLength2; i++) {
  //           this.Teacher[i] = this.TasksTeachers[i].firstName + this.TasksTeachers[i].lastName ;
  //         }
  //
  //       });
  //     }
  //   });
  // }
}
