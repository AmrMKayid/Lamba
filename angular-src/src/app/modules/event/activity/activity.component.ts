import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  apiUrlHTML = appConfig.apiUrl;

  id: string;
  activity: any;
  user: Object;
  owner: boolean

  constructor(private route: ActivatedRoute,
              private http: Http,
              private eventservice: EventService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventservice.getActivity(this.id).subscribe(res => {
          this.activity = res.data[0];
        },
        error => {
          return this.router.navigate(["/event/myactivities/view"]);
        });

    });
  }


}
