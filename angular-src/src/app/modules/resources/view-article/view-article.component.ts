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
  addReply: boolean = false;
  author: string;
  comments: any = [{}];
  commentContent: String;
  replies: any = [{}];
  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    this.articleService.loadArticle(id).subscribe(
      (retrieved: any) => {
        this.article = retrieved.data;
        this.author = `${this.article.name.firstName} ${this.article.name.lastName}`;
        this.isInitialized = true;
        this.comments = this.article.comments;
        let r: { showReply: boolean, replyContent: string }[] = new Array(this.comments.length);
        //this.replies.length = this.comments.length;
        for (let i = 0; i < this.comments.length; i++) {
          r[i] = {
            showReply: false,
            replyContent: ''
          };
        }
        this.replies = r;
      }, err => {
        alert(`Article not retrieved: ${err.error.msg}`);
        this.router.navigate(['/resources']);
      }
    );
    window.scrollTo(0, 0);
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
  comment() {
    // if(this.commentContent==''){
    //   alert("Please write in a comment");
    // }
    // else {
    this.articleService.comment(this.article._id, this.commentContent).subscribe(
      (res: any) => {
        this.replies.push({
          showReply: false,
          replyContent: ''
        });
        this.articleService.loadArticle(this.article._id).subscribe(
          (retrieved: any) => {
            this.comments = retrieved.data.comments;
            this.commentContent = '';
          }
        );
      }, err => {
        alert(`Article was not updated: ${err.error.msg}`);
      }
    )
    //}
  }
  reply(i, comment_id, content) {
    this.articleService.reply(this.article._id, comment_id, content).subscribe(
      (res: any) => {
        this.articleService.loadArticle(this.article._id).subscribe(
          (retrieved: any) => {
            this.comments = retrieved.data.comments;
            this.replies[i].replyContent = '';
            this.replies[i].showReply = false;

          }
        );

      }, err => {
        alert(`Article was not updated: ${err.error.msg}`);
      }
    )
  }

  //TODO: Once favorites is implemented, we need to send to the backend.
  addToFavorite(id) {

  }

  showReply(i) {
    this.replies.forEach(element => element.showReply = false);
    this.replies[i].showReply = true;
  }
}
