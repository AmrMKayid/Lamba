import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetToken: string;
  password: string;
  passwordConfirm: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    //Holds the token sent by the mail
    let uuidREGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    this.resetToken = this.route.snapshot.params['token'];
    if (!this.resetToken || !uuidREGEX.test(this.resetToken)) {
      new Noty({
        type: 'error',
        text: 'Invalid token format, please request a new reset link to your email',
        timeout: 3500,
        progressBar: true
      }).show();
      this.router.navigate(['/']);
    }
  }

  submit() {
    if (!this.password || !this.passwordConfirm) {
      return new Noty({
        type: 'warning',
        text: 'Please fill in both fields',
        timeout: 3000,
        progressBar: true
      }).show();
    } else if (this.password.length < 8) {
      return new Noty({
        type: 'warning',
        text: `Passwords needs to consist of at least 8 characters`,
        timeout: 3000,
        progressBar: true
      }).show();
    } else if (this.password !== this.passwordConfirm) {
      return new Noty({
        type: 'warning',
        text: `Passwords don't match, please try again`,
        timeout: 3000,
        progressBar: true
      }).show();
    } else {
      //TODO: Start logic here depending on the backend endpoint
      this.http.post(appConfig.apiUrl + '/user/reset/' + this.resetToken, { password: this.password }).subscribe(
        (res: any) => {
          new Noty({
            type: 'success',
            text: `Your password has been changed successfully. Please use your new password to log in`,
            timeout: 4000,
            progressBar: true
          }).show();
          this.router.navigate(['/login']);
        },
        (error) => {
          let errMsg = error.error ? error.error.msg : error.msg;
          if (errMsg === 'Invalid token.') {
            new Noty({
              type: 'error',
              text: `Invalid reset link, please try to re-request a new reset email.`,
              timeout: 4000,
              progressBar: true
            }).show();
            this.router.navigate(['/forget']);
          } else if (errMsg === 'Token expired.') {
            new Noty({
              type: 'warning',
              text: `Reset link has expired, please request a new reset mail`,
              timeout: 4000,
              progressBar: true
            }).show();
            this.router.navigate(['/forget']);
          } else {
            new Noty({
              type: 'error',
              text: `Something went wrong: ${errMsg}`,
              timeout: 4000,
              progressBar: true
            }).show();
          }
        }
      )
    }
  }

}
