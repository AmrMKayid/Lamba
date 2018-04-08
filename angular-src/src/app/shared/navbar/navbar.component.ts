import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {

    if (localStorage.getItem('authentication')) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

  }

}
