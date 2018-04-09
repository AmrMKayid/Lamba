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

  Accept(teacherID) {
    if (localStorage.length == 0) {
      this.toaster.pop({
        type: 'info',
        title: "Oops!",
        body: "Acess Denied",
        timeout: 2000
      });
      //this.router.navigate([]);
      return false;
    }
   
    this.httpClient.get('http://localhost:3000/api/admin/accept_teacher/' +  teacherID)
      //.catch((err: any) => console.log(err))
      .subscribe(res => {
        this.toaster.pop({
          type: 'success',
          title: "Congratulations!",
          body: "Teacher Verified Successfully",
          timeout: 2000
        });
        this.router.navigate(['/profile/admin/verify-teachers']);        

      });


  }
  // Decline(teacherID) {
  //   if (localStorage.length == 0) {
  //     this.toaster.pop({
  //       type: 'info',
  //       title: "Oops!",
  //       body: "Acess Denied",
  //       timeout: 2000
  //     });
  //     //this.router.navigate(['']);
  //     return false;
  //   }
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   this.http.post('http://localhost:3000/admin/decline_teacher/' +  teacherID, { headers: headers })
  //     //.catch((err: any) => console.log(err))
  //     .subscribe(res => {
  //       this.toaster.pop({
  //         type: 'info',
  //         title: "Done!",
  //         body: "Teacher Declined",
  //         timeout: 2000
  //       });
  //       //this.router.navigate(['dashboard/cart']);

  //     });
  // }

}
