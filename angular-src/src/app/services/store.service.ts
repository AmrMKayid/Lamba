import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StoreService {

   constructor(private http: Http) { }
  
  createItem(item)
  {
  	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoiQWJkdWxsYWgiLCJsYXN0TmFtZSI6IkVtYWQifSwic2NoZWR1bGUiOnsiVGltZXRhYmxlIjpbXSwiY3JlYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wMy0zMFQxMDoxMzoxNS42MDBaIn0sIm15SXRlbXMiOltdLCJjYXJ0IjpbXSwicXVhbGlmaWNhdGlvbnMiOltdLCJzdHVkZW50cyI6W10sIl9pZCI6IjVhYmUwZGJhMmU0ZDMxMzEyYjBhMjI0YiIsImVtYWlsIjoiYWJkdWxsYWhAaG90bWFpbC5jb20iLCJyb2xlIjoiVGVhY2hlciIsIl9fdiI6MH0sImlhdCI6MTUyMjU3OTczOCwiZXhwIjoxNTIyNjIyOTM4fQ.TkwG5CyPOeKwtOHRLaHvTTDUKyWDNX_I6M_8YUIq_h0');
    return this.http.post('http://127.0.0.1:3000/api/store/create', item, {headers:headers}).map((res) => res.json());
  }
}
