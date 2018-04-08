import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean;
  // role;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

    if (localStorage.getItem('authentication')) {
      this.isLoggedIn = true;
      // this.role = this.auth.getUserFromToken(localStorage.getItem('authentication')).role;
    }
    else {
      this.isLoggedIn = false;
    }

  }

  logout() {
    this.auth.logout();
  }

}
