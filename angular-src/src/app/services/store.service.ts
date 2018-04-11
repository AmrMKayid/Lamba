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
        'Authorization':localStorage.getItem('authentication')
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
    return this.httpc.get(this.base_address + 'view/' + limit+ '/' + page , this.options);
  }

  itemsCount()
  {
      return this.httpc.get(this.base_address + 'countItmes' , this.options );
  }

 likeItems(item){
   	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization',  localStorage.getItem('authentication'));
return this.http.patch('http://localhost:3000/api/store/likeItems/'+item._id , item, {headers:headers}).map((Response)=> Response.json().data);
  }

  unlikeItems(item){
    return this.http.patch('http://localhost:3000/api/store/likeItems/'+item._id , item).map((Response)=> Response.json().data);
  }

    getItem(id)
 {
 	var headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('authorization',  localStorage.getItem('authentication'));
    return this.http.get('http://127.0.0.1:3000/api/store/myitems/view/' + id,{headers:headers}).map((res) => res.json());
 }

 }
