import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {ArticlesService} from '../articles.service';
import {Router} from '@angular/router';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.scss']
})
export class ViewArticlesComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  articles: any[];
  articlesInitialized: boolean;
  tagsInitialized: boolean;
  allTags: { value: string, id: string }[];
  selectedTags: any[];
  filterTagsIDs: string[] = [];
  keyword: string;

  IMG_URL = appConfig.apiUrl + '/uploads/articlesThumbnails/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private http: HttpClient,
              private articlesService: ArticlesService,
              private router: Router) {
  }

  ngOnInit() {
    this.articles = [];
    this.articlesInitialized = false;
    this.tagsInitialized = false;
    this.allTags = [];
    this.articlesService.loadAllArticles().subscribe(
      (res: any) => {
        this.articles = res.data.reverse();
        this.articlesInitialized = true;
      }, err => {
        this.router.navigate(['/']);
        new Noty({
          type: 'error',
          text: `Articles could not be retrieved: ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
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

  //TODO: Needs some optimization in capturing the input
  onTagsChanged() {
    this.filterTagsIDs = [];
    this.selectedTags.forEach(element => {
      this.filterTagsIDs.push(element.id);
    });
  }

  getTagByID(allTags: { value: string, id: string }[], tagID: string) {
    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].id === tagID) {
        return allTags[i].value;
      }
    }
  }

  setTag(tag) {
    this.filterTagsIDs = [];
    this.filterTagsIDs.push(tag);
    this.selectedTags = [];
    this.selectedTags.push({value: tag, id: tag, display: this.getTagByID(this.allTags, tag)});
  }
}
