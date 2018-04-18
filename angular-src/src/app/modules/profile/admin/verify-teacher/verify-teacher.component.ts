import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpModule, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-verify-teacher',
  templateUrl: './verify-teacher.component.html',
  styleUrls: ['./verify-teacher.component.css'],
  animations: [routerTransition()]

})
export class VerifyTeacherComponent implements OnInit {

  public Teachers = [];
  authorization = {Authorization: localStorage.getItem('authentication')};


  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/admin/teachers_verfication', {headers: this.authorization})
      .subscribe((res: any) => {
        this.Teachers = res.data;
      }, err => {
        console.log(err.error.msg);
      });
  }

  Accept(teacherID) {
    this.httpClient.get('http://localhost:3000/api/admin/accept_teacher/' + teacherID, {headers: this.authorization})
    //.catch((err: any) => console.log(err))
      .subscribe(res => {
        this.router.navigate(['/profile/admin/verify-teacher']);
        new Noty({
          type: 'success',
          text: 'Teacher Verified Successfully',
          timeout: 2000,
          progressBar: true
        }).show();
        this.router.navigate(['/profile/admin/verify-teacher']);
      },
        err => {
          console.log(err.error.msg);
        });


  }


  viewProfile(teacherID) {
    this.router.navigate(['profile', teacherID]);
  }

  Dashboard(){
    this.router.navigate(['/profile/admin/dashboard']);

  }

  Decline(teacherID) {
    this.httpClient.get('http://localhost:3000/api/admin/decline_teacher/' +  teacherID, {headers: this.authorization})
    .subscribe(res => {
      this.router.navigate(['/profile/admin/verify-teacher']);
      new Noty({
        type: 'success',
        text: 'Teacher Rejected Successfully',
        timeout: 2000,
        progressBar: true
      }).show();
      this.router.navigate(['/profile/admin/verify-teacher']);
    },
      err => {
        console.log(err.error.msg);
      });

    }
}
