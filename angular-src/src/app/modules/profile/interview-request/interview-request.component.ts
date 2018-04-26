import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-interview-request',
  templateUrl: './interview-request.component.html',
  styleUrls: ['./interview-request.component.scss']
})
export class InterviewRequestComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  contactemail: string;
  contactnumber: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  submitForm(contactemail, contactnumber) {
    let form = {
      contactEmail: contactemail,
      contactNumber: contactnumber
    }
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.post(appConfig.apiUrl + '/user/requestVerification', form, {headers: autorization}).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
        this.router.navigate(['/']);
      },
      err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

}
