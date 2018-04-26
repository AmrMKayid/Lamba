import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { appConfig } from "../../../app.config";
import {AuthService} from "../../../services/auth.service";

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
  currentUser : any;

  constructor(private route: ActivatedRoute,
    private http: Http,
    private eventservice: EventService,
    private router: Router,
  private auth: AuthService) {
  }

  viewUser(id) {
    this.router.navigate(['profile', id]);
  }

  messageUser(id) {
    this.router.navigate(['chat/' + id]);
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventservice.getActivity(this.id).subscribe(res => {
        this.activity = res.data[0];
      },
        error => {
          new Noty({
            type: 'error',
            text: `Something went wrong: ${error.error ? error.error.msg : error.msg}`,
            progressBar: true,
            timeout: 3000
          }).show()
          return this.router.navigate(["/event/myactivities/view"]);
        });

    });
  }


}
