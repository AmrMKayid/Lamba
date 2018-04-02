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
  selector: 'app-verify-teacher',
  templateUrl: './verify-teacher.component.html',
  styleUrls: ['./verify-teacher.component.css']
})
export class VerifyTeacherComponent implements OnInit {

  public Teachers = [];
  p: number = 1;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private toaster: ToasterService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/admin/teachers_verfication')
    .subscribe((res: any) => { this.Teachers = res.data; });
  }

}
