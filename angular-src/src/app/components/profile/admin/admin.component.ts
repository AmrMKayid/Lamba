import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ToasterService } from 'angular5-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


 

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private toaster: ToasterService,
    private router: Router
  ) {

  }

  ngOnInit() {
   
  }
 
  ViewUnverifiedArticles(){
    this.router.navigate(['/profile/admin/un-verified-articles']);        

  }
  ViewTeachersRequests(){
    this.router.navigate(['/profile/admin/verify-teachers']);        

  }

}
