import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../../../app.config";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  userID;
  user;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });
  }

  getUserByID(userID) {
    this.http.get(appConfig.apiUrl + '/user/getUser/' + userID)
      .subscribe((res: any) => {
        this.user = res.data;
      });
  }


  ngOnInit() {
    this.getUserByID(this.userID);
  }

}
