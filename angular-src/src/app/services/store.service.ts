import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {

    readonly base_address: string = 'http://localhost:3000/api/store/';
    readonly headers = new HttpHeaders(
      {
        'Content-Type': 'application/json' ,
        // TODO Remove authorization
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoiQWhtZWQiLCJtaWRkbGVOYW1lIjoiU2hhd2t5IiwibGFzdE5hbWUiOiJIdXNzZWluIn0sInNjaGVkdWxlIjp7IlRpbWV0YWJsZSI6W10sImNyZWF0ZWRBdCI6IjIwMTgtMDMtMzFUMTM6Mjg6MTcuODg0WiIsInVwZGF0ZWRBdCI6IjIwMTgtMDMtMzFUMTM6Mjg6MTcuODg0WiJ9LCJteUl0ZW1zIjpbXSwiY2FydCI6W10sInF1YWxpZmljYXRpb25zIjpbXSwic3R1ZGVudHMiOltdLCJfaWQiOiI1YWJmOGNmMTcxNzRmNDFkNDAyZDIyODIiLCJyb2xlIjoiQWRtaW4iLCJlbWFpbCI6ImExMjNAYTEyMy5jb20iLCJfX3YiOjB9LCJpYXQiOjE1MjI1OTYwMzEsImV4cCI6MTUyMjYzOTIzMX0.7FmxSPuiTxreBKw6MIW6RnqHETHPR1qZYKdpY4zPlos'
      });

    readonly options = { headers: this.headers };

   constructor(private http: Http,private httpc: HttpClient) { }

  createItem(item)
  {
  	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization',  localStorage.getItem('authentication'));
    return this.http.post('http://127.0.0.1:3000/api/store/create', item, {headers:headers}).map((res) => res.json());
  }

  viewItems(limit:number,page:number)
  {
    return this.httpc.get(this.base_address + 'view/' + limit+ '/' + page);
  }

  itemsCount()
  {
      return this.httpc.get(this.base_address + 'countItmes' );
  }

}
