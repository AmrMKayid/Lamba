import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//import { ToasterService } from 'angular5-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.css']
})
export class UnVerifiedArticlesComponent implements OnInit {
  public unVerifiedArticlesList = [];
  constructor(
    private httpClient: HttpClient,
     private http: Http,
    private router: Router
   // private toast: ToasterService
  ) { }

  ngOnInit() {
    
   let autorization =  { Authorization: localStorage.getItem('authentication') };
    console.log("ok");
     this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles',{headers: autorization})
       .subscribe((res: any) => { this.unVerifiedArticlesList = res.data;
        console.log( res.msg);
        console.log(res.data);
       /* this.toast.pop({
          type: 'success',
          title: "Success",
          body: res.msg,
          timeout: 3000
        });*/
      }, err => {
        console.log( err.error.msg);
        /*this.toast.pop({
          type: 'error',
          title: "Error!",
          body: err.error.msg,
          timeout: 3000
        });*/
      });    
       
      console.log(this.unVerifiedArticlesList);
  }
  showProduct(articleId){
    console.log(articleId);
    this.router.navigate(['/profile/admin/verify-articles/'+articleId]);        


  }

}