import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {appConfig} from '../app.config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: any) {
    return this.http.post<any>(appConfig.apiUrl + '/auth/login', user)
      .map(token => {
        if (token && token.data) {
          localStorage.setItem('authentication', token.data);
        }
        return token;
      });
  }

  logout() {
    localStorage.clear();
  }

  // Registration
  register(user: any) {
    return this.http.post(appConfig.apiUrl + '/auth/register', user);
  }

  public getUserFromToken(token: any): any {
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload).user;
    } else {
      return null;
    }
  }

  public getCurrentUser() {
    return this.getUserFromToken(localStorage.getItem('authentication'));
  }

  public getUserRole() {
    return this.getUserFromToken(localStorage.getItem('authentication')).role;
  }

}
