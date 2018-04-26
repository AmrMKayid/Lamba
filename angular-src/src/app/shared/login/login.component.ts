import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    email: this.email,
    username: this.email,
    password: this.password,
  });

  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    localStorage.clear();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(user: any) {

    if (!(user.email || user.username) || !user.password){
      new Noty({
        type: 'warning',
        text: `Please fill in all fields.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }

      console.log(user);

    this.authService.login(user)
      .subscribe(
        token => {
          window.open("/profile/me", "_self");
        },
        error => {
          new Noty({
            type: 'error',
            text: `Something went wrong while logging in:\n${error.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        });
  }

}
