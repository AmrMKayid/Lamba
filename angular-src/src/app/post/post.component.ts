import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None //To allow CSS classes dynamically (on the articles retrieved from the db)
})
export class PostComponent implements OnInit {
  public title: String;
  public articleContainer: String;
  public editorContent: String;

  //TODO: Export it into a service.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNjaGVkdWxlIjp7IlRpbWV0YWJsZSI6W10sImNyZWF0ZWRBdCI6IjIwMTgtMDMtMzBUMDY6MzY6MDguOTUyWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDMtMzBUMDY6MzY6MDguOTUyWiJ9LCJuYW1lIjp7ImZpcnN0TmFtZSI6Im1hbWEiLCJsYXN0TmFtZSI6ImJhYmEifSwiYWxsb3dlZEFydGljbGVzIjpbIjVhYmRlY2M4NWYwOGQwNmM1Zjk5MjIyYiJdLCJlbnJvbGxlZEFjdGl2aXRpZXMiOltdLCJfaWQiOiI1YWJkZGFkODFhMDJjYTU4MjRhMjcwODIiLCJ1c2VybmFtZSI6ImNoaWxkMSIsInBhcmVudF9pZCI6IjVhYmRkMDczNzYwOTljNGFlMjc5M2FlZSIsIl9fdiI6MH0sImlhdCI6MTUyMjU3MTc5OCwiZXhwIjoxNTIyNjE0OTk4fQ.4lrRqy12BMmNZLxgmxW4qnD5EedhkiB0iQxWiY17neY"
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
        articles.reverse().forEach((element, i) => {
          this.articleContainer += `<h1 class="text-primary text-center">Article#${i + 1} ${element.title} </h1><hr>
          <div class="container jumbotron">${element.content}</div><br><br>`
        });
      },err =>{
        let msg = err.error.msg;
        alert(`Articles not retrieved: ${msg}`);
      });
  }

  onSubmit() {
    //TODO: Beuatify these alerts! ,_,
    if (!this.title || !this.editorContent) {
      alert("Please fill in both the title and the content");
      return;
    }
    let article = {
      title: this.title,
      content: this.editorContent
    };

    this.http.post('http://localhost:3000/api/articles', article, this.httpOptions)
      .pipe().subscribe(res => {
        this.reloadArticles();
      }, err => {
        let msg = err.error.msg;
        alert(`Article was not posted: ${msg}`);
      });
  }

}
