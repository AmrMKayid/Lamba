import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerTransition} from '../router.animations';
import {ArticlesService} from '../../../resources/articles.service';
import {AuthService} from "../../../../services/auth.service";
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.scss'],
  encapsulation: ViewEncapsulation.None, //To allow dynamic CSS classes (from the innerHTML)
  animations: [routerTransition()]

})
export class UnVerifiedArticlesComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;
  
  public unVerifiedArticlesList = [];
  public List=[1];
  public article = [];
  allTags: { value: string, id: string }[];
  tagsInitialized: boolean;
  IMG_URL = appConfig.apiUrl + '/uploads/articlesThumbnails/';

  constructor(private httpClient: HttpClient,
              private http: Http,
              private articlesService: ArticlesService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {

    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.allTags = [];
    this.tagsInitialized = false;
    this.httpClient.get(appConfig.apiUrl + '/user/viewUnverifiedArticles', {headers: autorization}).pipe()
      .subscribe((res: any) => {
        this.unVerifiedArticlesList = res.data;
        this.List=res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
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
          text: `Tags could not be retrieved: ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );


  }

  verifyArticle(articleId, ownerId) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get(appConfig.apiUrl + '/user/verifyArticle/' + articleId, {headers: autorization})
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
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

    let notification = {
      title: 'Article Verification',
      description: 'Congratulations:Your Article has been verified you can find it on the Resources page',
      url: '/resources/id/' + articleId,
      recieving_user_id: ownerId._id
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: autorization}).subscribe(
      (res: any) => {
      },
      err => {
      });
  }

  rejectArticle(articleId, ownerId, title) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.delete(appConfig.apiUrl + '/user/rejectArticle/' + articleId, {headers: autorization})
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
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
    let notification = {
      title: 'Article Verification',
      description: 'Sorry:Your Article ' + title + ' has been rejected.Try posting another.',
      url: '/resources/post',
      recieving_user_id: ownerId._id
    }
    this.httpClient.post(appConfig.apiUrl + '/notifications/create', notification, {headers: autorization}).subscribe(
      (res: any) => {
      },
      err => {
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
