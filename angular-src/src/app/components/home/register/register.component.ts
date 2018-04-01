import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user: FormGroup;

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
      }),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  onSubmit({value, valid}: { value: User, valid: boolean }) {
    // console.log(value, valid);
    this.register(value);
  }

  model: any = {};
  loading = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  register(value: any) {
    console.log(value);
    this.loading = true;
    this.authService.create(value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }


  // ngOnInit() {
  // }

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
  gender: string;
};
