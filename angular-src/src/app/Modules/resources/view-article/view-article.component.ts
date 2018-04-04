import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  private sub: any;
  article: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (this.articleService.articles[+params['id']]) {
        this.article = this.articleService.articles[+params['id']];
        window.scrollTo(0, 0);
      } else {
        this.router.navigate(['/resources']);
      }
    });
  }
  //TODO: When the feedback is reworked in the backend, we shall send back the updated article only and in here we should set it to that  
  upvote(i) {
    this.articleService.upvote(i);
  }
  downvote(i) {
    this.articleService.upvote(i);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
