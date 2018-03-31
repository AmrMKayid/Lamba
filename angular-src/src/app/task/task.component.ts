import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  comment: string;
  commentdata = {
    Comment:"",
    userId: "",
    userType:"",
    taskId:""
  };
  CreateNewComment() {
    this.commentdata.Comment = this.comment;
    this.comment = "";
    this.commentdata.userType = "Child";
    this.commentdata.userId = "5abfe6f3750ffc19b0689a36";
    this.commentdata.taskId = "5abffe465386b43094a8c784";

    this.http.post('http://localhost:3000/api/task/newComment', this.commentdata).subscribe();
  }

}
