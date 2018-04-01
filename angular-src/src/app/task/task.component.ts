import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public students = {};
  
  ngOnInit() {
    this.GetAllStudents();
  }  
  
  comment: string;
  commentdata = {
    Comment:"",
    userId: "",
    userType:"",
    taskId:""

  };
  taskname: string;
  description: string;
  taskdata = {
    Title:"",
    Description: "",
    TeacherId:"",
    StudentId:""
  };
  CreateNewComment() {
    console.log("commented");
    this.commentdata.Comment = this.comment;
    this.comment = "";
    this.commentdata.userType = "Child";
    this.commentdata.userId = "5abfe6f3750ffc19b0689a36";
    this.commentdata.taskId = "5abffe465386b43094a8c784";

    this.http.post('http://localhost:3000/api/task/newComment', this.commentdata).subscribe();
  }

  CreateNewTask() {
    console.log("done");
    this.taskdata.Title = this.taskname;
    this.taskname = "";
    this.taskdata.Description = this.description;
    this.description="";
    this.taskdata.TeacherId = "5abfe6f3750afc19b0689a36";
    this.taskdata.StudentId = "5abffe465388b43094a8c784";

    this.http.post('http://localhost:3000/api/task/newTask', this.taskdata).subscribe();
  }
  GetAllStudents(){
    this.http.get('http://localhost:3000/api/task/getStudents').subscribe((res: any) => {
      this.students = res.data.userMap;
      console.log(this.students)
    });
    
  }
}