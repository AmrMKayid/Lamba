import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.scss']
})
export class ViewArticlesComponent implements OnInit {
  articles: any[];
  articlesInitialized: boolean;
  tagsInitialized: boolean;
  allTags: { value: string, id: string }[];
  selectedTags: any[];
  filterTagsIDs: string[] = [];
  keyword: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  constructor(private http: HttpClient, private articlesService: ArticlesService) { }

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
        alert(`Articles not retrieved: ${err.error.msg}`);
      }
    );
    this.articlesService.getAllTags().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.allTags.push({ value: element.name, id: element._id })
        });
        this.tagsInitialized = true;
      }, err => {
        alert(`Articles not retrieved: ${err.error.msg}`);
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
    this.selectedTags.push({ value: tag, id: tag, display: this.getTagByID(this.allTags, tag) });
  }
}
