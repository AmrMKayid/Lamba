import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// SERVICE IS USED JUST TO PASS DATA ACROSS COMPONENTS (INSTED OF @Input)
@Injectable()
export class ArticlesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': localStorage.getItem('authorization')
    })
  };
  //The service now holds no data, it just provides methods to subscribe to, and every route holds its own data
  constructor(private http: HttpClient) { }

  loadAllArticles() {
    return this.http.get('http://localhost:3000/api/articles', this.httpOptions)
      .pipe();
  }

  loadArticle(id: string) {
    return this.http.get('http://localhost:3000/api/article/' + id, this.httpOptions)
      .pipe();
  }

  upvote(id) {
    let body = {
      article_id: id,
      mode: "upvote"
    }
    return this.http.post('http://localhost:3000/api/articles/feedback', body, this.httpOptions)
      .pipe();

  }

  downvote(id) {
    let body = {
      article_id: id,
      mode: "downvote"
    }
    return this.http.post('http://localhost:3000/api/articles/feedback', body, this.httpOptions)
      .pipe();
  }
}