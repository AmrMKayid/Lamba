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
  contactemail = new FormControl('', [Validators.required]);
  contactnumber = new FormControl('', [Validators.required]);
  interviewForm: FormGroup = this.fb.group({
  contactEmail:this.contactemail,
  contactNumber:this.contactnumber
  });
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }
  submitForm(){
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.post('http://localhost:3000/api/user/requestVerification',this.interviewForm.value,{headers: autorization} ).subscribe(
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
        console.log(err)
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

}
