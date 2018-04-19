import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';
import {ArticlesService} from '../../../resources/articles.service';
@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.scss'],
  animations: [routerTransition()]
})
export class UnVerifiedArticlesComponent implements OnInit {
  public unVerifiedArticlesList = [];
  public article = [];
  allTags: { value: string, id: string }[];
  tagsInitialized: boolean;
  constructor(private httpClient: HttpClient,
              private http: Http,
              private articlesService: ArticlesService,
              private router: Router) {
  }

  ngOnInit() {

    let autorization = {Authorization: localStorage.getItem('authentication')};
    console.log("ok");
    this.allTags = [];
    this.tagsInitialized = false;
    this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles', {headers: autorization})
      .subscribe((res: any) => {
        this.unVerifiedArticlesList = res.data;
        
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

      this.articlesService.getAllTags().subscribe(
        (res: any) => {
          res.data.forEach(element => {
            this.allTags.push({value: element.name, id: element._id})
          });
          this.tagsInitialized = true;
        }, err => {
          this.router.navigate(['/']);
          new Noty({
            type: 'error',
            text: `Tags could not be retrieved: ${err.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        }
      );

      
  }

  verifyArticle(articleId) {
    console.log(articleId)
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get('http://localhost:3000/api/user/verifyArticle/' + articleId, {headers: autorization})
      .subscribe((res: any) => {
        this.article = res.data;
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
        this.ngOnInit();
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }
  rejectArticle(articleId) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.delete('http://localhost:3000/api/user/rejectArticle/' + articleId, {headers: autorization})
      .subscribe((res: any) => {
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
        this.ngOnInit();
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }
  
  getTagByID(allTags: { value: string, id: string }[], tagID: string) {
    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].id === tagID) {
        return allTags[i].value;
      }
    }
  }
}
