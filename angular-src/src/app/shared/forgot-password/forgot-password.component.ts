import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    let mailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email) {
      new Noty({
        type: 'warning',
        text: 'Email cannot be empty',
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    } else if (!mailREGEX.test(this.email.toLowerCase())) {
      new Noty({
        type: 'warning',
        text: 'Invalid email format provided, please re-enter a valid email',
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }
    this.http.post(appConfig.apiUrl + '/user/forgot/' + this.email, {}).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: `An email has been sent to your inbox. Follow the instructions in the email to reset your password`,
          timeout: 5000,
          progressBar: true
        }).show();
        this.router.navigate(['/']);

      },
      (error) => {
        let errMsg = error.error ? error.error.msg : error.msg;
        if (errMsg === 'No user exists with the provided email.') {
          return new Noty({
            type: 'error',
            text: `The email you entered is not associated with any of our users. Please make sure you entered the correct address`,
            timeout: 5000,
            progressBar: true

          }).show();
        } else if (errMsg === 'Reset email already sent.') {
          return new Noty({
            type: 'info',
            text: `You have already requested another password reset, you can use it in your mail. If you need to request a new reset mail, you need to wait for ${error.data} minutes`,
            timeout: 10000,
            progressBar: true
          }).show();
        } else {
          new Noty({
            type: 'error',
            text: `Something went wrong: ${errMsg}`,
            timeout: 5000,
            progressBar: true
          }).show();
          this.router.navigate(['/login']);
        }
      }
    )
  }

}
