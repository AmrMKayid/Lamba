import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {appConfig} from "../app.config";

@Injectable()
export class StoreService {

  readonly base_address: string = appConfig.apiUrl + '/store/';
  readonly headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      // TODO Remove authorization
      'Authorization': localStorage.getItem('authentication')
    });

  readonly options = {headers: this.headers};

  constructor(private http: Http, private httpc: HttpClient) {
  }

  createItem(item) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.post(appConfig.apiUrl + '/store/create', item, {headers: headers}).map((res) => res.json());
  }

  viewItems(limit: number, page: number) {
    return this.httpc.get(this.base_address + 'view/' + limit + '/' + page, this.options);
  }

  itemsCount() {
    return this.httpc.get(this.base_address + 'countItmes', this.options);
  }

  likeItems(item) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.patch(appConfig.apiUrl + '/store/likeItems/' + item._id, item, {headers: headers}).map((Response) => Response.json().data);
  }

  unlikeItems(item) {
    return this.http.patch(appConfig.apiUrl + '/store/likeItems/' + item._id, item).map((Response) => Response.json().data);
  }

  getItem(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    return this.http.get(appConfig.apiUrl + '/store/myitems/view/' + id, {headers: headers}).map((res) => res.json());
  }

}
