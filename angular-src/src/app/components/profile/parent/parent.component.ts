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
    console.log(localStorage.getItem('authorization'))
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

    let autorization =  { Authorization: localStorage.getItem('authorization') }

    this.http.post(appConfig.apiUrl + '/auth/child', newChild, {headers: autorization}).subscribe(
      data => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You've been successfully created New Child Account!",
          timeout: 3000
        });
      },
      error => {
        console.log(error)
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: error.msg,
          timeout: 3000
        });
      });

  }

}
