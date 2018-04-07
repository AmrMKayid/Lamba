import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
  encapsulation: ViewEncapsulation.None //To allow dynamic CSS classes (from the innerHTML)
})
export class ViewArticleComponent implements OnInit {
  article: any = {};
  isInitialized: boolean = false;
  author: string;
  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    this.articleService.loadArticle(id).subscribe(
      (retrieved: any) => {
        this.article = retrieved.data;
        this.author = `${this.article.name.firstName} ${this.article.name.lastName}`;
        this.isInitialized = true;
      }, err => {
        alert(`Article not retrieved: ${err.error.msg}`);
        this.router.navigate(['/resources']);
      }
    );
  }

  //TODO: When the feedback is reworked in the backend, we shall send back the updated article only and in here we should set it to that  
  upvote(id) {
    this.articleService.upvote(id).subscribe(
      (res: any) => {
        this.article.upvoters = res.data.upvoters;
        this.article.downvoters = res.data.downvoters;
      }, err => {
        alert(`Article was not updated: ${err.error.msg}`);
      }
    );
  }
  downvote(id) {
    this.articleService.downvote(id).subscribe(
      (res: any) => {
        this.article.upvoters = res.data.upvoters;
        this.article.downvoters = res.data.downvoters;
      }, err => {
        alert(`Article was not updated: ${err.error.msg}`);
      }
    );
  }
}
