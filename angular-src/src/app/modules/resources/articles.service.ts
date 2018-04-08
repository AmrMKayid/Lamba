import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// SERVICE IS USED JUST TO PASS DATA ACROSS COMPONENTS (INSTED OF @Input)
@Injectable()
export class ArticlesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': localStorage.getItem('authentication')
    })
  };
  //The service now holds no data, it just provides methods to subscribe to, and every route holds its own data
  constructor(private http: HttpClient) { }

  loadAllArticles() {
    return this.http.get('http://localhost:3000/api/articles', this.httpOptions)
      .pipe();
  }

  loadArticle(id: string) {
    return this.http.get('http://localhost:3000/api/articles/' + id, this.httpOptions)
      .pipe();
  }

  getAllTags() {
    return this.http.get('http://localhost:3000/api/tags/', this.httpOptions)
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
  comment(id,content) {
    let body = {
      article_id: id,
      comment_content: content
    }
    return this.http.post('http://localhost:3000/api/articles/comment', body, this.httpOptions)
      .pipe();
  }
  reply(article_id,comment_id,content){
    let body = {
      article_id: article_id,
      comment_id: comment_id,
      reply: content
    }
    return this.http.post('http://localhost:3000/api/articles/reply', body, this.httpOptions)
      .pipe();
  }
}
