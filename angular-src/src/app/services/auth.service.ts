import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {appConfig} from '../app.config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(value: any) {
    return this.http.post<any>(appConfig.apiUrl + '/auth/login', value)
      .map(user => {
        if (user && user.data) {
          localStorage.setItem('currentUser', JSON.stringify(this.getUserDetails(user.data).user));
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  // Registration
  create(user: any) {
    return this.http.post(appConfig.apiUrl + '/auth/register', user);
  }

  public getUserDetails(token: any): any {
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

}
