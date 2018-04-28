import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user: FormGroup;
  chosenRole;
  interests;

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
      }),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      // TODO: SELECT ROLE IN SIGN UP
      role: new FormControl('', Validators.required),
      interests: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    let mailREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = value.confirmPassword && value.email &&
      value.gender && value.name && value.name.firstName
      && value.name.lastName && value.password;
    if (!isValid) {
      new Noty({
        type: 'warning',
        text: `Please fill in all fields, they're required.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }
    else if (!mailREGEX.test(value.email.toLowerCase())) {
      new Noty({
        type: 'warning',
        text: `Invalid email provided.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }
    else if (value.password.length < 8) {
      new Noty({
        type: 'warning',
        text: `Password must be at least 8 characters.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    } else if (value.password !== value.confirmPassword) {
      new Noty({
        type: 'warning',
        text: `Passwords don't match, please re-enter them.`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    } else if (!(/^[a-zA-Z]+$/.test(value.name.firstName) && /^[a-zA-Z]+$/.test(value.name.lastName))) {
      new Noty({
        type: 'warning',
        text: `Name may only consist of English letters (No symbols/numerics).`,
        timeout: 3000,
        progressBar: true
      }).show();
      return false;
    }

    value.role = this.chosenRole;
    value.interests = this.interests;
    this.register(value);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.route.queryParams.subscribe(params => {
      this.chosenRole = params['role'];
      this.interests = params['interests'];
    });
  }

  register(value: any) {
    this.authService.register(value)
      .subscribe(
        data => {
          new Noty({
            type: 'success',
            text: `You have registered successfully. Please check your email for a verification link.`,
            timeout: 3000,
            progressBar: true
          }).show();
          new Noty({
            type: 'info',
            text: `If you don't recieve the link after a couple of minutes, you can request a new one by logging in.`,
            timeout: 4000,
            progressBar: true
          }).show();

          this.router.navigate(['/login']);
        },
        err => {
          new Noty({
            type: 'error',
            text: `Something went wrong while registering:\n${err.error ? err.error.msg : err.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        });
  }

}

export interface User {

  name: {
    firstName: string,
    lastName: string
  };
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  interests: Array<string>;
  gender: string;
};
