import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  constructor() { }
  
  /*
   * Gets the current logged in user's notifications
   * returns a promise
   */
  getMyNotifications()
  {
  	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization', localStorage.getItem('authentication'));
	return this.http.get('http://127.0.0.1:3000/api/notifications/get', {headers: headers}).map((res) => res.json());
  }
  
  /**
    * Creates a new notification in the database
    */
  CreateNotification(notification)
  {
  	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization', localStorage.getItem('authentication'));
	return this.http.post('http://127.0.0.1:3000/api/notifications/create', notification,{headers: headers}).map((res) => res.json());
  }
  
  /**
    * Changes the all the notifications last seen of a the current user to the current timestamp in the database
    */
   SeenNotification()
   {
	   	var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('authorization', localStorage.getItem('authentication'));
		return this.http.post('http://127.0.0.1:3000/api/notifications/seen', {headers: headers}).map((res) => res.json());
   }

}
