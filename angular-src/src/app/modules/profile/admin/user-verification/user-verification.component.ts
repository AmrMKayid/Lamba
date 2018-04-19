import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpModule, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';
@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
  animations: [routerTransition()]
})
export class UserVerificationComponent implements OnInit {
  public interviewRequests = [];
  constructor(private httpClient: HttpClient,
    private http: Http,
    private router: Router) { }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get('http://localhost:3000/api/user/viewVerificationForms', {headers: autorization})
      .subscribe((res: any) => {
        this.interviewRequests= res.data;
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
