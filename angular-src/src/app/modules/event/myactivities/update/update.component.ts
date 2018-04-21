import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../../services/event.service';
import {Router} from '@angular/router';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  myactivities: any[];
  activityId: string;
  name: string;
  price: number;
  current: any;
  key: string = 'name';
  description: string;
  place: string;
  activity_type: string;
  newOrEdit = false;
  createNew = false;
  editPressed = false;
  reverse: boolean = false;
  picture_url: string;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private http: Http,
              private router: Router,
              private eventservice: EventService,) {
  }


  editActivity() {
    var activityString = localStorage.getItem("Update");
    var activity = JSON.parse(activityString)._id;

    let editedActivity = {
      name: this.name,
      price: Number(this.price),
      description: this.description,
      plae: this.place,
      activity_type: this.activity_type,
      updated_at: Date.now()
    };

    this.http.patch(appConfig.apiUrl + '/activity/edit/' + activity, editedActivity)
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: "Updated!",
          timeout: 3000,
          progressBar: true
        }).show();

        localStorage.setItem("Update", null);
        this.router.navigate(["/event/myactivities/view"]);
      });

  }

  close() {

    this.router.navigate(["/event/myactivities/view"]);
    localStorage.setItem("Update", 'null')

  }


  ngOnInit() {
  };


}
