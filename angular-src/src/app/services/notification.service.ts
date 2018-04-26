import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {appConfig} from "../app.config";

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) {
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  /*
   * Gets the current logged in user's notifications
   * returns a promise
   */
  getMyNotifications() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.get(appConfig.apiUrl + '/notifications/get', this.httpOptions);
  }

  /**
   * Creates a new notification in the database
   */
  CreateNotification(notification) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.post(appConfig.apiUrl + '/notifications/create', notification, this.httpOptions).subscribe((res: any) => {
    });
  }

  /**
   * Changes the all the notifications last seen of a the current user to the current timestamp in the database
   */
  SeenNotification() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.post(appConfig.apiUrl + '/notifications/seen', this.httpOptions);
  }

  public getNotifCount() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('authentication')
      })
    };
    return this.http.get(appConfig.apiUrl + '/notifications/unopened/count', httpOptions);
  }

}
