import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// SERVICE IS USED JUST TO PASS DATA ACROSS COMPONENTS (INSTED OF @Input)
@Injectable()
export class ArticlesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoicmVlbSIsImxhc3ROYW1lIjoiZXcifSwic2NoZWR1bGUiOnsiVGltZXRhYmxlIjpbXSwiY3JlYXRlZEF0IjoiMjAxOC0wNC0wNVQxODoxMDo0Mi44MzZaIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0wNVQxODoxMDo0Mi44MzZaIn0sImpvaW5lZEF0IjoiMjAxOC0wNC0wNVQxODowNjowMi4zMDVaIiwibXlJdGVtcyI6W10sImNhcnQiOltdLCJpc1ZlcmlmaWVkIjpmYWxzZSwicXVhbGlmaWNhdGlvbnMiOltdLCJzdHVkZW50cyI6W10sIl9pZCI6IjVhYzY2NmEyZTFhNWY5MTM2NGQ4MjdmMCIsImVtYWlsIjoicmVlbUBob3RtYWlsLmNvbSIsInJvbGUiOiJUZWFjaGVyIiwiZ2VuZGVyIjoiZmVtYWxlIiwiX192IjowfSwiaWF0IjoxNTIzMDUyMTc4LCJleHAiOjE1MjMwOTUzNzh9.oBwHsRr-bjprtV9QlzxfR04RfKYpZ6P6RN8GarHHPbo"
      //localStorage.getItem('authorization')
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
  comment(id,content) {
    let body = {
      article_id: id,
      comment_content: content
    }
    return this.http.post('http://localhost:3000/api/articles/comment', body, this.httpOptions)
      .pipe();
  }
}
