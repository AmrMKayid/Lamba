import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {    
    if (localStorage.getItem('authentication')) {
      if (!this.tokenService.logoutIfExpired()) {
        this.tokenService.refreshToken(7);
      }
    }
  }
}