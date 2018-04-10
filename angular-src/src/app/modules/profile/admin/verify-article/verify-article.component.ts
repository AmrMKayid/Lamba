import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { ToasterService } from 'angular5-toaster';



@Component({
  selector: 'app-verify-article',
  templateUrl: './verify-article.component.html',
  styleUrls: ['./verify-article.component.css']
})
export class VerifyArticleComponent implements OnInit {
  public article=[];
  
  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
   // private toast: ToasterService

  ) { }

  ngOnInit() {
    
    console.log(this.route.snapshot.params['id']);
    let autorization =  { Authorization: localStorage.getItem('authentication') };
    this.httpClient.get('http://localhost:3000/api/user/viewArticleToVerify/'+this.route.snapshot.params['id'],{headers: autorization})
       .subscribe((res: any) => { this.article = res.data; 
       /* this.toast.pop({
        type: 'success',
        title: "Success",
        body: res.msg,
        timeout: 3000
      });*/
    }, err => {
      /*this.toast.pop({
        type: 'error',
        title: "Error!",
        body: err.error.msg,
        timeout: 3000
      });*/
    });   
       this.article.toString();
     

  }
verify(articleId){
  console.log(articleId);
  let autorization =  { Authorization: localStorage.getItem('authorization') };
  this.httpClient.get('http://localhost:3000/api/user/verifyArticle/'+articleId,{headers: autorization})
       .subscribe((res: any) => { this.article = res.data; 
       /* this.toast.pop({
          type: 'success',
          title: "Success",
          body: res.msg,
          timeout: 3000
        });*/
      }, err => {
        /*this.toast.pop({
          type: 'error',
          title: "Error!",
          body: err.error.msg,
          timeout: 3000
        });*/
      });   
      
  this.router.navigate(['/profile/admin/un-verified-articles']);        

}
}
