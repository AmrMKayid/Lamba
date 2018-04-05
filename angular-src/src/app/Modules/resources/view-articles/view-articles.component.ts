import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css']
})
export class ViewArticlesComponent implements OnInit {
  public articles: any[] = [];
  isInitialized: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authorization')
    })
  };
  constructor(private http: HttpClient, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.loadAllArticles().subscribe(
      (res: any) => {
        this.articles = res.data.reverse();
        this.isInitialized = true;
      }, err => {
        alert(`Articles not retrieved: ${err.error.msg}`);
      }
    );
  }



}
