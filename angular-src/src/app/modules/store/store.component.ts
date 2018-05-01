import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  isNotChild: boolean;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.isNotChild = this.auth.getCurrentUser().role !== 'Child';
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
  }
}
