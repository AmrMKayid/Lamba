import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role;

  constructor(private auth: AuthService, private router: Router) {
    
  }
  
  ngOnInit() {
    if (localStorage.getItem('authentication')) {
      if (this.auth.getCurrentUser().role)
        this.role = (this.auth.getCurrentUser().role).toLowerCase();
    }
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
  }

  isAdmin() {
    if (this.auth.getCurrentUser().role == 'Admin') {
      return true;
    }
    return false;
  }

  logout() {
    this.auth.logout();
  }
  
  hideNavbar(){
    if(this.router.url == '/profile/admin/dashboard')
       return false;
    if(this.router.url == '/profile/admin/un-verified-articles')
    return false;
    if(this.router.url == '/profile/admin/un-verified-activities')
    return false;
    if(this.router.url=='/profile/admin/verify-teachers')
    return false;
    if(this.router.url=='/profile/admin/add-admin')
    return false;
    return true;
       
  }
}
