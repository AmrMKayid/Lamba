import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  public sliders: Array<any> = [];
  public articles: Array<any> = [];
  public Teachers: Array<any> = [];

  public activities: Array<any> = [];
  public teacherForms: Array<any> = [];
  public forms;
  constructor(private httpClient: HttpClient) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider1.jpg',
        label: 'Learning is an Ocean',
        text:
          'Develop passion for Learning'
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: 'See the world through new eyes',
        text: 'Discover'
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: 'An investment in knowledge pays the best interest',
        text:
          'benjamin franklin'
      }
    );

  }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles', {headers: autorization})
      .subscribe((res: any) => {
        this.articles = res.data;
        console.log(res.msg);
      }, err => {
        console.log(err.error.msg);
      });
<<<<<<< HEAD
      this.httpClient.get('http://localhost:3000/api/admin/teachers_verfication', {headers: autorization})
      .subscribe((res: any) => {
        this.Teachers = res.data;
        console.log(res.msg);
        console.log(res.data);
      }, err => {
        console.log(err.error.msg);
      });

=======
      this.httpClient.get('http://localhost:3000/api/activity/viewUnverifiedActivities', {headers: autorization})
      .subscribe((res: any) => {
        this.activities = res.data;
        console.log(res.msg);
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
      this.httpClient.get('http://localhost:3000/api/admin/teachers_verfication', {headers: autorization})
      .subscribe((res: any) => {
        this.teacherForms = res.data;
        console.log(res.msg);
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
this.forms=this.teacherForms.length;
>>>>>>> 8297e78022b4965eaca17576526d62b4d83a7f10
  }

}
