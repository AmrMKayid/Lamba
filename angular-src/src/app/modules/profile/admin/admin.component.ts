import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser;
  token = localStorage.getItem('authentication');

  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

  }

  ViewUnverifiedArticles() {
    this.router.navigate(['/profile/admin/un-verified-articles']);

  }

  ViewTeachersRequests() {
    this.router.navigate(['/profile/admin/verify-teachers']);

  }


}
