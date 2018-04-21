import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ArticlesService} from '../articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {appConfig} from "../../../app.config";


@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
  encapsulation: ViewEncapsulation.None //To allow dynamic CSS classes (from the innerHTML)
})
export class ViewArticleComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  article: any = {};
  isInitialized: boolean = false;
  author: any;
  comments: any = [{}];
  commentContent: String;
  public articleID: String;
  currentUserRole: string;
  editPressed: boolean;
  pic_url: string;
  IMG = appConfig.apiUrl + "/uploads/articlesThumbnails/";

  isOwner: boolean;
  children: [any];
  selectedChild: string;

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticlesService, private auth: AuthService) {
  }


  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    this.currentUserRole = this.auth.getCurrentUser().role;
    this.articleService.loadArticle(id).subscribe(
      (retrieved: any) => {
        this.article = retrieved.data;
        this.isOwner = this.article.owner_id == this.auth.getCurrentUser()._id;
        if (!this.article.thumbnail_url) {
          this.pic_url = appConfig.apiUrl + "/uploads/articlesThumbnails/articleDefault";
        }
        else {
          this.pic_url = appConfig.apiUrl + "/uploads/articlesThumbnails/" + this.article.thumbnail_url;
        }
        this.author = this.article.owner;
        this.comments = this.article.comments;
        if (this.currentUserRole == 'Parent') {
          this.articleService.getChildren().subscribe(
            (res: any) => {
              this.children = res.data;
            },
            (err) => {
              new Noty({
                type: 'error',
                text: `Something went wrong while retrieving your children: ${err.error.msg}`,
                timeout: 3000,
                progressBar: true
              }).show();
            }
          );
        }
        this.isInitialized = true;

      }, err => {
        this.router.navigate(['/resources']);
        new Noty({
          type: 'error',
          text: `Article not retrieved: ${err.error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
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
        new Noty({
          type: 'warning',
          text: `Article was not updated: ${err.error.msg}`,
          timeout: 2500,
          progressBar: true
        }).show();
      }
    );
  }

  downvote(id) {
    this.articleService.downvote(id).subscribe(
      (res: any) => {
        this.article.upvoters = res.data.upvoters;
        this.article.downvoters = res.data.downvoters;
      }, err => {
        new Noty({
          type: 'warning',
          text: `Article was not updated: ${err.error.msg}`,
          timeout: 2500,
          progressBar: true
        }).show();
      }
    );
  }

  comment() {
    if (this.commentContent == '' || typeof this.commentContent == 'undefined' || this.commentContent == null) {
      new Noty({
        type: 'warning',
        text: `Sorry, comment cannot be empty`,
        timeout: 2500,
        progressBar: true
      }).show();
      return false;
    }
    else {
      this.articleService.comment(this.article._id, this.commentContent).subscribe(
        (res: any) => {
          this.articleService.loadArticle(this.article._id).subscribe(
            (retrieved: any) => {
              this.comments = retrieved.data.comments;
              this.commentContent = '';
            }
          );
        }, err => {
          new Noty({
            type: 'error',
            text: `Something went wrong while submitting the comment: ${err.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        }
      )
    }
  }

  addToFavorite(id) {
    this.articleService.addToFavorites(id).subscribe(
      (res: 200) => {
        new Noty({
          type: 'success',
          text: `Added to favorites successfully`,
          timeout: 1500,
          progressBar: true
        }).show();
      }, err => {
        new Noty({
          type: 'error',
          text: `Something went wrong while adding to favorites: ${err.error.msg}`,
          timeout: 2000,
          progressBar: true
        }).show();
      }
    );
  }

  delete(id) {
    this.articleService.delete(id).subscribe(
      (res: 200) => {
        new Noty({
          type: 'success',
          text: `Your article has been deleted successfully`,
          timeout: 1500,
          progressBar: true
        }).show();
        this.router.navigate(['/resources']);
      }, err => {
        new Noty({
          type: 'error',
          text: `Something went wrong while deleting the article: ${err.error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

  edit(id) {
    this.editPressed = true;
    this.router.navigate(['/resources/edit/' + this.article._id]);
  };

  assignChild() {
    this.articleService.assignChild(this.article._id, this.selectedChild).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
        this.router.navigate(['/resources']);
      }, err => {
        let msg = err.error.msg;
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

}
