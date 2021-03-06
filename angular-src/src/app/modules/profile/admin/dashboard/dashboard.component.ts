import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {HttpClient} from '@angular/common/http';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  public sliders: Array<any> = [];
  public articles: Array<any> = [];
  public Teachers: Array<any> = [];

  public activities: Array<any> = [];
  public interviews: Array<any> = [];
  public teacherForms: Array<any> = [];

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
    this.httpClient.get(appConfig.apiUrl + '/user/viewUnverifiedArticles', {headers: autorization})
      .subscribe((res: any) => {
        this.articles = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    this.httpClient.get(appConfig.apiUrl + '/admin/teachers_verfication', {headers: autorization})
      .subscribe((res: any) => {
        this.Teachers = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

    this.httpClient.get(appConfig.apiUrl + '/activity/viewUnverifiedActivities', {headers: autorization})
      .subscribe((res: any) => {
        this.activities = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    this.httpClient.get(appConfig.apiUrl + '/admin/teachers_verfication', {headers: autorization})
      .subscribe((res: any) => {
        this.teacherForms = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    this.httpClient.get(appConfig.apiUrl + '/user/viewVerificationForms', {headers: autorization})
      .subscribe((res: any) => {
        this.interviews = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

}
