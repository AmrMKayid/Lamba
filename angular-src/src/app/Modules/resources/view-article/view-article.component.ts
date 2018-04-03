import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  private sub: any;
  article: any;
  
  constructor(private route: ActivatedRoute, private articleService: ArticlesService) { }
  
  ngOnInit() {
    console.log("YAY");
    this.sub = this.route.params.subscribe(params => {
      console.log("YAY");
      console.log(+params['id']);      
      this.article = this.articleService.articles[+params['id']];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
