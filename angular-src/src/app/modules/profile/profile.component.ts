import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {appConfig} from '../../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  apiUrlHTML = appConfig.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  id: string;
  private sub: any;
  isChild: boolean = false;
  isParent: boolean = false;
  isTeacher: boolean = false;
  currentUser;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      //A hopeless try to optimize the worst possible solution :D trying to send along the user instead of just the ID
      //In case the user is not a child only.
      this.http.get(appConfig.apiUrl + '/user/getUserByID/' + this.id, this.httpOptions)
        .subscribe(
          (res: any) => {
            if (!res.data.role) {
              this.isChild = true;
            } else {
              if (res.data.role === 'Parent') {
                this.isParent = true;
              } else {
                this.isTeacher = true;
              }
            }
            this.currentUser = res.data;
          }, (err) => {
            if (err.status === 422) {
              new Noty({
                type: 'error',
                text: `Invalid ID provided.`,
                timeout: 1500,
                progressBar: true
              }).show();
              this.router.navigate(['homepage']);
            } else if (err.status === 404) {
              new Noty({
                type: 'error',
                text: `ID does not exist.`,
                timeout: 1500,
                progressBar: true
              }).show();
              this.router.navigate(['homepage']);
            }
          });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
