import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ArticlesService} from '../articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
  encapsulation: ViewEncapsulation.None //To allow dynamic CSS classes (from the innerHTML)

})
export class ViewArticleComponent implements OnInit {
  article: any = {};
  child : any = {};
  isInitialized: boolean = false;
  addReply: boolean = false;
  author: string;
  comments: any = [{}];
  commentContent: String;
  replies: any = [{}];
  currentUserId: string;
    public articleID: String;
  currentUserRole: string;
  editPressed: boolean;
  pic_url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };


  constructor(private router: Router,  private httpClient: HttpClient, private route: ActivatedRoute, private articleService: ArticlesService, private auth: AuthService) {
  }


  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    this.articleService.loadArticle(id).subscribe(
      (retrieved: any) => {
        this.article = retrieved.data;
        if(!this.article.thumbnail_url){
          this.pic_url = "https://i2.wp.com/penpaperpencil.net/wp-content/uploads/2016/01/Drawing-pencils-guide.jpg?fit=900%2C490";
        }
        else{
          this.pic_url = "http://127.0.0.1:3000/api/uploads/articlesThumbnails/"+this.article.thumbnail_url;
        }
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

    this.currentUserId = this.auth.getCurrentUser()._id;
    this.httpClient.get('http://localhost:3000/api/user/getUser/'+this.currentUserId).subscribe((res:any)=>{

      this.currentUserRole = res.data.role;
    });

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
    var data = sessionStorage.getItem('id');
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

  reply(i, comment_id, content) {
    if (content == '' || typeof content == 'undefined' || content == null) {
      new Noty({
        type: 'warning',
        text: `Sorry, your reply cannot be empty`,
        timeout: 2500,
        progressBar: true
      }).show();
      return false;
    }
    else {
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
          new Noty({
            type: 'error',
            text: `Something went wrong while submitting the reply: ${err.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        }
      )
    }
  }

  //TODO: Once favorites is implemented, we need to send to the backend.
  addToFavorite(id) {

  }

  showReply(i) {
    this.replies.forEach(element => element.showReply = false);
    this.replies[i].showReply = true;
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

  assign(){
    let body = {
      articleID: this.article._id,
    };
    this.httpClient.patch('http://localhost:3000/api/user/assignArticleToChild/5ad3835c0f37ba3f1c769a86',body, this.httpOptions)
      .subscribe((res:any) => {

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
      });
  }

}
