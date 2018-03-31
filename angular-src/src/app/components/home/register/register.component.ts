import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // model: any =
  //   {
  //     "name" : {
  //       "firstName" : "Amr",
  //       "lastName" : "Kayid"
  //     },
  //     "email" : "amrmkayid2@Angular.com",
  //     "password" : "1234567890",
  //     "confirmPassword" : "1234567890",
  //     "role" : "Parent",
  //   };
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  register() {
    this.loading = true;
    this.authService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }


  ngOnInit() {
  }

}
