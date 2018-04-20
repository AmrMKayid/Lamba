import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  id: string;
  activity: Object;
  user: Object;
  owner: boolean

  constructor(private route: ActivatedRoute,
              private toaster: ToasterService,
              private http: Http,
              private eventservice: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.eventservice.getActivity(this.id).subscribe(res => {
          this.activity = res.data;
          this.user = res.seller;
          this.owner = res.owner;
          console.log(this.user);
        },
        error => {
          return this.router.navigate(["/event/myactivities/view"]);
        });

    });
  }


  deleteActivity() {
    this.http.delete(appConfig.apiUrl + '/activity/delete/' + this.activity["_id"])
      .subscribe(res => {
        this.router.navigate(["/event/myactivities/view"]);
      });

  }

  updateActivity() {

    localStorage.setItem("Update", JSON.stringify(this.activity));
    this.router.navigate(["/events/myactivities/update"]);
  }


}
