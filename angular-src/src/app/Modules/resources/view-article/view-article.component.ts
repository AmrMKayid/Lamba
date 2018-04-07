import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  article: any = {};
  isInitialized: boolean = false;
  //notEmpty:boolean=false;
  author: string;
  comments: any = [{}];
  commentContent: String;
  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    this.articleService.loadArticle(id).subscribe(
      (retrieved: any) => {
        this.article = retrieved.data;
        this.author = `${this.article.name.firstName} ${this.article.name.lastName}`;
        this.isInitialized = true;
        this.comments = this.article.comments;
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
  comment(){
    if(this.commentContent==''){
      alert("Please write in a comment");
    }
    else {
      this.articleService.comment(this.article._id, this.commentContent).subscribe(
        (res: any) => {
          this.articleService.loadArticle(this.article._id).subscribe(
            (retrieved: any) => {
              this.comments = retrieved.data.comments;
            }
          );
          this.commentContent = '';
        }, err => {
          alert(`Article was not updated: ${err.error.msg}`);
        }
      )
    }
  }
}
