import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../app.config";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  Users: any;

  // Pagination: initializing p to one
  p: number = 1;
  filter;

  constructor(private router: Router,
              private auth: AuthService,
              private http: HttpClient) {
  }

  getAllUsers() {
    this.http.get(appConfig.apiUrl + '/user/getAllUsers/')
      .subscribe((res: any) => {
        this.Users = res.data;
        this.Users = this.Users.filter(user => user._id != this.auth.getCurrentUser()._id)
      });
  }

  viewUser(user) {
    this.router.navigate(['profile', user._id]);
  }

  messageUser(user) {
    this.router.navigate(['chat/' + user._id]);
  }

  ngOnInit() {
    this.getAllUsers();
  }
}
