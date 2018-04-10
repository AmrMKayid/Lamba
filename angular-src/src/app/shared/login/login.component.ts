import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular5-toaster/src/toaster.service';


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

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private toaster: ToasterService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(user: any) {
    this.authService.login(user)
      .subscribe(
        token => {
          const userRole = this.authService.getUserFromToken(token.data).role;
          if (userRole === 'Parent') {
            this.returnUrl = 'profile/parent';
          } else if (userRole === 'Teacher') {
            this.returnUrl = 'profile/teacher';
          } else if (userRole === 'Admin') {
            this.returnUrl = 'profile/admin/dashboard';
          }
          else {
            this.returnUrl = 'profile/child';
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toaster.pop({
            type: 'error',
            title: 'Error!',
            body: error.msg,
            timeout: 3000
          });
          console.log(error);
        });
  }

}
