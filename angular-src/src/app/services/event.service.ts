import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  readonly base_address: string = 'http://localhost:3000/api/activity/';
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
    return this.http.post('http://127.0.0.1:3000/api/activity/create', activity, {headers: headers}).map((res) => res.json());
  }

  viewActivities(limit: number, page: number) {
    return this.httpc.get(this.base_address + 'view/' + limit + '/' + page, this.options);
  }

  activitiesCount() {
    console.log("Mayar...event.service.ts");
    return this.httpc.get('http://127.0.0.1:3000/api/activity/countActivities', this.options);
  }

  goingActivities(activity) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.patch('http://localhost:3000/api/activity/goingActivities/' + activity._id, activity, {headers: headers}).map((Response) => Response.json().data);
  }


  getActivity(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.get('http://127.0.0.1:3000/api/activity/myactivities/view/' + id, {headers: headers}).map((res) => res.json());
  }

  getChildren(user){
    return this.httpc.get("http://127.0.0.1:3000/api/user/getUserChildren/"+user['_id'], this.options);
  }

  registerChild(activityID,childID){
    let param = {
      "activityID":activityID,
      "childId":childID
    };
    return this.httpc.post(this.base_address + "activity/registerChild",param, this.options);
  }

}
