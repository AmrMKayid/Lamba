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
  this.getTasks("5abffe465388b43094a8c784");
  }
  Tasks = []
  TasksTitles = []
  TasksDescriptions = []
  TasksTeachers = []
  TasksCreatedAt = []
  TasksUpdatedAt = []
  Teacher = []
  getTasks(childId){
    this.http.get("http://localhost:3000/api/task/getTasks/" + childId).subscribe((res: any) => { 
      this.Tasks = res.data; 
      // console.log(this.Tasks[0].Title);
      var arrayLength = this.Tasks.length;
      for (var i = 0; i < arrayLength; i++) {
        this.TasksTitles[i] = this.Tasks[i].Title;
        this.TasksDescriptions[i] = this.Tasks[i].Description;
        this.TasksCreatedAt[i] = this.Tasks[i].createdAt;
        this.TasksUpdatedAt[i] = this.Tasks[i].updatedAt;
        this.http.get('http://localhost:3000/api/task/getTeacher/' + this.Tasks[i].TeacherId)
        .subscribe((res: any) => { this.TasksTeachers[i] = res.data;
          var arrayLength2 = this.TasksTeachers.length;
          for (var i = 0; i < arrayLength2; i++) {
            this.Teacher[i] = this.TasksTeachers[i].firstName + this.TasksTeachers[i].lastName ;
          }

        });
      }
    });
  }
}
