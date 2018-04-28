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
    this.resetToken = this.route.snapshot.params['token'];
    if (!this.resetToken) {
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

        },
        (error) => {

        }
      )
    }
  }

}
