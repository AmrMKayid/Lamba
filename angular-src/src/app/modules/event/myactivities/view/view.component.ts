import {Component, OnInit} from '@angular/core';

import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../../services/event.service';
import {Router} from '@angular/router';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  myactivities: any;

  constructor(private http: Http,
              private router: Router,
              private eventservice: EventService,) {
    this.getMyActivities()
  }


  getMyActivities() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    this.http.get(appConfig.apiUrl + '/activity/myActivities/view', {headers: headers}).map((res) => res.json())
      .subscribe((data: any) => {
        this.myactivities = data.data;
      });
  }

  deleteActivity(activityId) {
    this.http.delete(appConfig.apiUrl + '/activity/delete/' + activityId)
      .subscribe(res => {
        new Noty({
          type: 'error',
          text: "Deleted!",
          timeout: 3000,
          progressBar: true
        }).show();

        this.getMyActivities();

      });

  }

  updateActivity(activity) {

    localStorage.setItem("Update", JSON.stringify(activity));
    this.router.navigate(["/event/myactivities/update"]);
  }


  ngOnInit() {
  }

}
