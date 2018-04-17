import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-un-verified-activities',
  templateUrl: './un-verified-activities.component.html',
  styleUrls: ['./un-verified-activities.component.scss'],
  animations: [routerTransition()]
})
export class UnVerifiedActivitiesComponent implements OnInit {
  public unVerifiedActivitiesList = [];
  public user;
  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) { }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get('http://localhost:3000/api/activity/viewUnverifiedActivities', {headers: autorization})
      .subscribe((res: any) => {
        this.unVerifiedActivitiesList = res.data;
        console.log(res.msg);
        console.log(res.data);
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

 

}
