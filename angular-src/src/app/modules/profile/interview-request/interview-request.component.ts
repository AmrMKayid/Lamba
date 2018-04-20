import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-interview-request',
  templateUrl: './interview-request.component.html',
  styleUrls: ['./interview-request.component.scss']
})
export class InterviewRequestComponent implements OnInit {
  contactemail: string;
  contactnumber: string;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }
  submitForm(contactemail, contactnumber){
    let form={
      contactEmail:contactemail,
      contactNumber:contactnumber
    }
   let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.post('api/user/requestVerification',form,{headers: autorization} ).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
       this.router.navigate(['/']);        
      },
      err=> {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

}
