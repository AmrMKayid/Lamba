import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../../app.config";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;
  isEmpty;
  Users: any;
  isDirty;
  // Pagination: initializing p to one
  p: number = 1;
  filter;

  constructor(private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute) {
  }

  getAllUsers(firstName, lastName) {
    this.http.get(appConfig.apiUrl + `/user/getAllUsers?first=${firstName}&last=${lastName}`)
      .subscribe((res: any) => {
        this.Users = res.data;
        this.Users = this.Users.filter(user => user._id != this.auth.getCurrentUser()._id);
        this.isEmpty = this.Users.length === 0;
      });
  }

  viewUser(user) {
    this.router.navigate(['profile', user._id]);
  }

  messageUser(user) {
    this.router.navigate(['chat/' + user._id]);
  }

  ngOnInit() {
    this.isDirty = false;
    this.isEmpty = true;
    this.filter = "";
  }
  searchUsers() {
    this.isDirty = true;
    //This can now be ported as a new component (without the search input),
    //with the search bar being in the navbar, and clicking on search in the search bar routes to the new component with the appropriate query paramaters
    //Splitting them with space (first and last name), and you can even limit the search to 2 spaces (since we limit the users to no spaces in their first and last name)
    let firstName = this.filter.split(" ")[0];
    let lastName = this.filter.split(" ")[1];
    //If no query params are sent, empty string reaches the backend instead of (undefined)
    this.getAllUsers(firstName ? firstName : "", lastName ? lastName : "")
  }
}
