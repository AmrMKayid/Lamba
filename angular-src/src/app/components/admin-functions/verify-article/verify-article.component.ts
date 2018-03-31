import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-article',
  templateUrl: './verify-article.component.html',
  styleUrls: ['./verify-article.component.css']
})
export class VerifyArticleComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
