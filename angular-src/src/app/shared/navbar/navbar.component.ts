import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean;
  role;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

    if (localStorage.getItem('authentication')) {
      this.isLoggedIn = true;
      this.role = (this.auth.getCurrentUser().role).toLowerCase();
    }
    else {
      this.isLoggedIn = false;
    }

  }

  logout() {
    this.auth.logout();
  }

}
