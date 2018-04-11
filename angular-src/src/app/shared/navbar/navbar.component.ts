import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('authentication')) {
     this.role = (this.auth.getCurrentUser().role).toLowerCase();
    }
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
  }
  isAdmin(){
    if((this.auth.getCurrentUser().role).toLowerCase()=='admin'){
      return true;
    }
    return false;
  }

  logout() {
    this.auth.logout();
  }

}
