import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ArticlesService } from '../../resources/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-resources',
  templateUrl: './fav-resources.component.html',
  styleUrls: ['./fav-resources.component.scss']
})
export class FavResourcesComponent implements OnInit {

  articles: any[];
  articlesInitialized: boolean;
  tagsInitialized: boolean;
  allTags: { value: string, id: string }[];

  IMG_URL = 'http://localhost:3000/api/uploads/articlesThumbnails/';
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
          text: `Articles could not be retrieved: ${err.error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
    this.articlesService.getAllTags().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.allTags.push({ value: element.name, id: element._id })
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
  getTagByID(allTags: { value: string, id: string }[], tagID: string) {
    for (let i = 0; i < allTags.length; i++) {
      if (allTags[i].id === tagID) {
        return allTags[i].value;
      }
    }
  }
}
