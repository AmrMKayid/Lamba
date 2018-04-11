import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import {ToasterService} from 'angular5-toaster/src/toaster.service';
import { Router } from '@angular/router';


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
