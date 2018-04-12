import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  isChild: boolean = false;
  isParent: boolean = false;
  isTeacher: boolean = false;
  currentUser;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      //A hopeless try to optimize the worst possible solution :D trying to send along the user instead of just the ID
      //In case the user is not a child only.
      this.http.get(appConfig.apiUrl + '/user/getUser/' + this.id)
        .subscribe((res: any) => {
          if (!res.data) {
            this.isChild = true;
          } else {
            if (res.data.role === 'Parent') {
              this.isParent = true;
            } else {
              this.isTeacher = true;
            }
            this.currentUser = res.data;
          }
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
