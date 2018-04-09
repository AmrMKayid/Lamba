import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.scss']
})
export class RegisterRoleComponent implements OnInit {

  constructor(private router: Router,
              private http: HttpClient) { }

  chosenRole(role) {
    this.router.navigate(['register'], {queryParams: {role: role}});
  }

  ngOnInit() {
  }

}
