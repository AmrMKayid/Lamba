import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appConfig} from "../../../../app.config";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  userID;
  @Input() user;

  //schedule
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }


  ngOnInit() {
    this.sat = this.user.schedule.table.saturday;
    this.sun = this.user.schedule.table.sunday;
    this.mon = this.user.schedule.table.monday;
    this.tues = this.user.schedule.table.tuesday;
    this.wed = this.user.schedule.table.wednesday;
    this.thurs = this.user.schedule.table.thursday;
    this.fri = this.user.schedule.table.friday;
  }

}
