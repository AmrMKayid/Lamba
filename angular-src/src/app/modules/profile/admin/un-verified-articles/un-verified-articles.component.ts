import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.css'],
  animations: [routerTransition()]
})
export class UnVerifiedArticlesComponent implements OnInit {
  public unVerifiedArticlesList = [];
  public article = [];

  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) {
  }

  ngOnInit() {

    let autorization = {Authorization: localStorage.getItem('authentication')};
    console.log("ok");
    this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles', {headers: autorization})
      .subscribe((res: any) => {
        this.unVerifiedArticlesList = res.data;
        console.log(res.msg);
        console.log(res.data);
      }, err => {
        console.log(err.error.msg);
      });

    console.log(this.unVerifiedArticlesList);
  }

  verifyArticle(articleId) {
    console.log(articleId)
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get('http://localhost:3000/api/user/verifyArticle/' + articleId, {headers: autorization})
      .subscribe((res: any) => {
        this.article = res.data;
        this.ngOnInit();
      }, err => {

      });


  }

}
