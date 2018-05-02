import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DEFAULT_RESIZE_TIME } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  isNotChild: boolean = false;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.isNotChild = !(!this.auth.getCurrentUser().role);
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
  }
}
