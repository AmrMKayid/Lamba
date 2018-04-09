import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {appConfig} from "../../../app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

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
