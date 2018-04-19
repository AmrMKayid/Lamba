import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pushRightClass: string = 'push-right';
  currentUser;

  constructor(private translate: TranslateService, public router: Router, private auth: AuthService) {
    this.currentUser = this.auth.getCurrentUser(); 
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
  isLoggedIn() {
    return localStorage.getItem('authentication');
  }
  hideNavbar(){
    if(this.router.url == '/profile/admin/dashboard')
    return true;
    if(this.router.url == '/profile/admin/un-verified-articles')
    return true;
    if(this.router.url == '/profile/admin/un-verified-activities')
    return true;
    if(this.router.url=='/profile/admin/verify-teachers')
    return true;
    return false;
       
  }
  isAdmin() {
    if (this.auth.getCurrentUser().role == 'Admin') {
      return true;
    }
    return false;
  }
  
}
