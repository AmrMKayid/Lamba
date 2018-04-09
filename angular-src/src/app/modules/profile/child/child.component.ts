import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  currentUser;

  constructor(private router: Router,
              private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

}
