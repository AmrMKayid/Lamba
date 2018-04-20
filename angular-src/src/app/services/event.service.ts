import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {appConfig} from "../app.config";

@Injectable()
export class EventService {

  readonly base_address: string = appConfig.apiUrl + '/activity/';
  readonly headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      // TODO Remove authorization
      'Authorization': localStorage.getItem('authentication')
    });

  readonly options = {headers: this.headers};

  constructor(private http: Http, private httpc: HttpClient) {
  }

  createActivity(activity) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.post(appConfig.apiUrl + '/activity/create', activity, {headers: headers}).map((res) => res.json());
  }

  viewActivities(limit: number, page: number) {
    return this.httpc.get(this.base_address + 'view/' + limit + '/' + page, this.options);
  }

  activitiesCount() {
    console.log("Mayar...event.service.ts");
    return this.httpc.get(appConfig.apiUrl + '/activity/countActivities', this.options);
  }

  goingActivities(activity) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.patch(appConfig.apiUrl + '/activity/goingActivities/' + activity._id, activity, {headers: headers}).map((Response) => Response.json().data);
  }


  getActivity(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.get(appConfig.apiUrl + '/activity/myactivities/view/' + id, {headers: headers}).map((res) => res.json());
  }

  getChildren(user){
    return this.httpc.get(appConfig.apiUrl + '/user/getUserChildren/' +user['_id'], this.options);
  }

  registerChild(activityID,childID){
    let param = {
      "activityID":activityID,
      "childId":childID
    };
    return this.httpc.post(this.base_address + "registerChild",param, this.options);
  }

}
