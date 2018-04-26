import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-cschedule',
  templateUrl: './cschedule.component.html',
  styleUrls: ['./cschedule.component.css']
})
export class CscheduleComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;
  
  public userID;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  public day = [];
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  createTeacherSchedule;
  createChildShcedule;

  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.userID = params['id'];
    });
  }


  getChildSchedule() {

    this.http.get(appConfig.apiUrl + '/schedule/getMySchedule/' + this.userID, this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.table.saturday;
      this.sun = res.data.table.sunday;
      this.mon = res.data.table.monday;
      this.tues = res.data.table.tuesday;
      this.wed = res.data.table.wednesday;
      this.thurs = res.data.table.thursday;
      this.fri = res.data.table.friday;

    });


  }

  updateChildSchedule(Slot, newtitle, newdescription, newurl, thisday) {
    var body = {
      title: newtitle,
      description: newdescription,
      url: newurl,
      day: thisday
    }

    this.http.patch(appConfig.apiUrl + '/schedule/updateChildSchedule' + Slot._id + '/' + this.userID, body, this.httpOptions).subscribe((res: any) => {
      if (thisday == 'saturday') {
        var index = this.sat.indexOf(Slot);
        this.sat[index] = res.data;
      }
      if (thisday == 'sunday') {
        var index = this.sun.indexOf(Slot);
        this.sun[index] = res.data;
      }
      if (thisday == 'monday') {
        var index = this.mon.indexOf(Slot);
        this.mon[index] = res.data;
      }
      if (thisday == 'tuesday') {
        var index = this.tues.indexOf(Slot);
        this.tues[index] = res.data;
      }
      if (thisday == 'wednesday') {
        var index = this.wed.indexOf(Slot);
        this.wed[index] = res.data;
      }
      if (thisday == 'thursday') {
        var index = this.thurs.indexOf(Slot);
        this.thurs[index] = res.data;
      }
      if (thisday == 'friday') {
        var index = this.fri.indexOf(Slot);
        this.fri[index] = res.data;
      }
    });
  }


  ngOnInit() {
    this.getChildSchedule();
  }

  fsat() {
    this.day = this.sat;
  }

  fsun() {
    this.day = this.sun;
  }

  fmon() {
    this.day = this.mon;
  }

  ftues() {
    this.day = this.tues;
  }

  fwed() {
    this.day = this.wed;
  }

  fthurs() {
    this.day = this.thurs;
  }

  ffri() {
    this.day = this.fri;
  }


}
