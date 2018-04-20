import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// SERVICE IS USED JUST TO PASS DATA ACROSS COMPONENTS (INSTED OF @Input)
@Injectable()
export class ArticlesService {

  //The service now holds no data, it just provides methods to subscribe to, and every route holds its own data
  constructor(private http: HttpClient) {
  }

  loadAllArticles() {
    return this.http.get('api/articles', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  loadArticle(id: string) {
    return this.http.get('api/articles/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  getAllTags() {
    return this.http.get('api/tags/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  upvote(id) {
    let body = {
      article_id: id,
      mode: "upvote"
    }
    return this.http.post('api/articles/feedback', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();

  }

  downvote(id) {
    let body = {
      article_id: id,
      mode: "downvote"
    }
    return this.http.post('api/articles/feedback', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  comment(id, content) {
    let body = {
      article_id: id,
      comment_content: content
    }
    return this.http.post('api/articles/comment', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  reply(article_id, comment_id, content) {
    let body = {
      article_id: article_id,
      comment_id: comment_id,
      reply: content
    }
    return this.http.post('api/articles/reply', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  delete(id) {
    return this.http.delete('api/articles/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  addToFavorites(id: string) {
    return this.http.post('api/user/favorites/resources/' + id, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }

  getChildren() {
    return this.http.get('api/user/myChildren', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authentication')
      })
    })
      .pipe();
  }
  assignChild(articleID, childID) {
    return this.http.patch('api/user/assignArticleToChild/' + childID, { articleID: articleID },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authentication')
        })
      })
      .pipe();
  }
}
