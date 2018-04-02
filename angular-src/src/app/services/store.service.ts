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
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoiQWJkdWxsYWgiLCJsYXN0TmFtZSI6IkVtYWQifSwic2NoZWR1bGUiOnsiVGltZXRhYmxlIjpbXSwiY3JlYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIn0sIm15SXRlbXMiOltdLCJjYXJ0IjpbXSwicXVhbGlmaWNhdGlvbnMiOltdLCJzdHVkZW50cyI6W10sIl9pZCI6IjVhYmUwZGJhMmU0ZDMxMzEyYjBhMjI0YiIsImVtYWlsIjoiYWJkdWxsYWhAaG90bWFpbC5jb20iLCJyb2xlIjoiVGVhY2hlciIsIl9fdiI6MH0sImlhdCI6MTUyMjY1ODg2OSwiZXhwIjoxNTIyNzAyMDY5fQ.h5E7vAAM4yV4rfk95svzLr4ahGT619R44MAhFqDRGiE'
      });

    readonly options = { headers: this.headers };

   constructor(private http: Http,private httpc: HttpClient) { }

  createItem(item)
  {
  	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoiQWJkdWxsYWgiLCJsYXN0TmFtZSI6IkVtYWQifSwic2NoZWR1bGUiOnsiVGltZXRhYmxlIjpbXSwiY3JlYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIn0sIm15SXRlbXMiOltdLCJjYXJ0IjpbXSwicXVhbGlmaWNhdGlvbnMiOltdLCJzdHVkZW50cyI6W10sIl9pZCI6IjVhYmUwZGJhMmU0ZDMxMzEyYjBhMjI0YiIsImVtYWlsIjoiYWJkdWxsYWhAaG90bWFpbC5jb20iLCJyb2xlIjoiVGVhY2hlciIsIl9fdiI6MH0sImlhdCI6MTUyMjY1ODg2OSwiZXhwIjoxNTIyNzAyMDY5fQ.h5E7vAAM4yV4rfk95svzLr4ahGT619R44MAhFqDRGiE');
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
