import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private auth: AuthService) {
  }

  taskId: String;
  p: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  commentx : String;
  title: String;
  description: String;
  createdAt: Date;
  updatedAt: Date;
  comments: any;
  studentId: String;
  teacherId: string;
  taskComments = [];
  currentUser: any;

  newComment: any;

  ngOnInit() {

    this.currentUser = this.auth.getCurrentUser();

    this.taskId = this.route.snapshot.params.id

    this.getTask();
    this.getComments();


  }


  getTask() {
    this.http.get(appConfig.apiUrl + '/task/getTask/' + this.taskId, this.httpOptions).subscribe((res: any) => {
      this.title = res.data.title;
      this.description = res.data.description;
      this.createdAt = res.data.createdAt;
      this.updatedAt = res.data.updatedAt;
      this.comments = res.data.comments;
      this.studentId = res.data.studentId;
      this.teacherId = res.data.userId;
    });
  }

  Notification =  {
    title: "",
    description: "",
    url: "",
    recieving_user_id: "",
  };


  markTaskAsDone(){
    this.http.get(appConfig.apiUrl + '/task/deleteTask/' + this.taskId, this.httpOptions).subscribe();
    this.Notification.title = "Task is Done";
    this.Notification.description = "Task " + this.title + " with description " + this.description ;
    this.Notification.url = " ";
    this.Notification.recieving_user_id = this.teacherId;
      this.http.post(appConfig.apiUrl + '/booking/newNotif', this.Notification, this.httpOptions).subscribe();
  new Noty({
        type: 'success',
        text: `Task is Marked As Done!`,
        timeout: 3000,
        progressBar: true
      }).show();
      this.router.navigate(['/profile/me']);
    }

  getComments() {
    this.http.get(appConfig.apiUrl + '/task/getComments/' + this.taskId, this.httpOptions).subscribe((res: any) => {
      this.taskComments = res.data;

      this.taskComments.sort(function(x, y){
      return  y.createdAt - x.createdAt;
  });
    });
  }


  createNewComment(comment) {
    var commentData = {
      comment: comment,
      role: this.currentUser.role,
      taskId: this.taskId
    };
    this.http.post(appConfig.apiUrl + '/task/newComment', commentData, this.httpOptions).subscribe(
      (res: any) => {

        var commentData2 = {
          comment: comment,
          role: this.currentUser.role,
          userId: {
          name: this.currentUser.name,
          photo: this.currentUser.photo
        }
        };
        this.taskComments = this.taskComments.concat(commentData2);

        new Noty({
          type: 'success',
          text: 'Comment created successfully',
          timeout: 3000,
          progressBar: true
        }).show();
      },
      error => {
        new Noty({
          type: 'error',
          text: error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

    this.newComment = "";
    this.commentx = "";


  }

}
