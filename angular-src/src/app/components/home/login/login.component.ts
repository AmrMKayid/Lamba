import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../register/register.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // TO GET CURRENT USER INFO
  // JSON.parse(localStorage.getItem('currentUser'))

  user: FormGroup;

  onSubmit({value, valid}: { value: User, valid: boolean }) {
    // TODO: Edit login method
    // value.username = value.email;
    this.login(value);
  }

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.user = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(value: any) {
    console.log(value);
    this.loading = true;
    this.authService.login(value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

}

export interface User {
  email: string;
  username: string;
  password: string;
};
