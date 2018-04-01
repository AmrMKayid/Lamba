import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.css']
})
export class UnVerifiedArticlesComponent implements OnInit {
  public unVerifiedArticlesList = [];
  constructor(
    private httpClient: HttpClient,
    // private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles')
      .subscribe((res: any) => { this.unVerifiedArticlesList = res.data; });

  }

}
