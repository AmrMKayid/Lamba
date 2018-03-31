import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public content: String;
  public title: String;
  public articleContainer: String;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3ROYW1lIjoiYWJkbyIsImxhc3ROYW1lIjoiaGVzaGFtIn0sInNjaGVkdWxlIjp7IlRpbWV0YWJsZSI6W10sImNyZWF0ZWRBdCI6IjIwMTgtMDMtMzBUMDU6NTE6NDcuOTIwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDMtMzBUMDU6NTE6NDcuOTIwWiJ9LCJteUl0ZW1zIjpbXSwiY2FydCI6W10sInF1YWxpZmljYXRpb25zIjpbXSwic3R1ZGVudHMiOltdLCJfaWQiOiI1YWJkZDA3Mzc2MDk5YzRhZTI3OTNhZWUiLCJlbWFpbCI6InBhcmVudDFAZ21haWwuY29tIiwicm9sZSI6IlBhcmVudCIsIl9fdiI6MH0sImlhdCI6MTUyMjQ4Nzg0MiwiZXhwIjoxNTIyNTMxMDQyfQ.yoOVuZaDHFwxmcpOZAbnFeUkP0j4UK739acsXKUJY7M"
    })
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.reloadArticles();
  }

  reloadArticles() {
    this.articleContainer = "";
    this.http.get('http://localhost:3000/api/articles', this.httpOptions)
      .pipe().subscribe((res: any) => {
        let articles: Array<any> = res.data;
        articles.forEach(element => {
          this.articleContainer += `<h1 class="text-primary text-center"> ${element.title} </h1><hr>${element.content}<br><br>`
        });
      });
  }
  updateContent($event: any) {
    this.content = $event.html;
  }

  onSubmit() {
    let article = {
      title: this.title,
      content: this.content
    };

    this.http.post('http://localhost:3000/api/articles', article, this.httpOptions)
      .pipe().subscribe((res) => {
        this.reloadArticles();
      });
  }

}
