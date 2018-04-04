import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// SERVICE IS USED JUST TO PASS DATA ACROSS COMPONENTS (INSTED OF @Input)
@Injectable()
export class ArticlesService {
  public articles: any[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': localStorage.getItem('authorization')
    })
  };

  constructor(private http: HttpClient) { }

  reloadArticles() {
    return this.http.get('http://localhost:3000/api/articles', this.httpOptions)
      .pipe();
  }

  setArticles(newArticles){
    this.articles = newArticles;
  }

  //TODO: Outsource the feedback in the backend to reload [EFFICIENCY]
  upvote(id) {
    let body = {
      article_id: id,
      mode: "upvote"
    }

    this.http.post('http://localhost:3000/api/articles/feedback', body, this.httpOptions)
      .pipe().subscribe(res => {
        this.reloadArticles().subscribe((retrieved: any) =>{
          this.articles = retrieved;
        });
      }, err => {
        let msg = err.error.msg;
        alert(`Article was not updated: ${msg}`);
      });

  }
  downvote(id) {
    let body = {
      article_id: id,
      mode: "downvote"
    }
    
    this.http.post('http://localhost:3000/api/articles/feedback', body, this.httpOptions)
      .pipe().subscribe(res => {
        this.reloadArticles().subscribe((retrieved: any) =>{
          this.articles = retrieved;
        });
      }, err => {
        let msg = err.error.msg;
        alert(`Article was not updated: ${msg}`);
      });
  }

}
