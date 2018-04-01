import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {AuthService} from '../../../services/auth.service';
import {ToasterService} from "angular5-toaster";
import {appConfig} from "../../../app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  childFirstName;
  childlastName;
  childUsername;
  childPassword;
  childConfirmPassword;
  childGender;
  newChildBtn: boolean;

  constructor(private router: Router,
              private http: HttpClient,
              private toaster: ToasterService) {
  }

  ngOnInit() {

    this.newChildBtn = false;
  }

  newChild() {

    let newChild = {
      name: {
        firstName: this.childFirstName,
        lastName: this.childlastName
      },
      username: this.childUsername,
      password: this.childPassword,
      confirmPassword: this.childConfirmPassword,
      gender: this.childGender,
    };

    this.http.post(appConfig.apiUrl + '/auth/child', newChild).subscribe(
      data => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You've been successfully created New Child Account!",
          timeout: 3000
        });
      },
      error => {
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: error.msg,
          timeout: 3000
        });
      });

  }

}
