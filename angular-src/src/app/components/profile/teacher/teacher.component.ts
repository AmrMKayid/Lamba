import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {ToasterService} from 'angular5-toaster';
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',

  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  state: string;
  zip: number;
  street: string;
  email: string;
  about: string;
  currentUserID: string;
  fees: number;
  phone: number;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private http: Http,
              private toaster: ToasterService) {
  }

  ngOnInit() {
    this.currentUserID = JSON.parse(localStorage.getItem('currentUser'))._id;
    // console.log(this.currentUser);
//  this.httpClient.get('http://localhost:3000/api/user/getUserInfo/'+this.currentUserID,

}


  onEditInfo(): void {
   if (!this.firstName||!this.lastName||!this.email){
     this.toaster.pop({
     type: 'error',
     title: "Error!",
     body: "all fields are required",
     timeout: 3000
     });
    console.log("faild")
    return;
   }
    const user = {
      name: {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
      },
      email: this.email,
      about: this.about,
      address: {
        city: this.city,
        state: this.state,
        zip: this.zip,
        street: this.street,
      },
      fees: this.fees,
      phone: this.phone


    }
  //  console.log(user);
    this.http.patch('http://localhost:3000/api/user/updateUser/' + this.currentUserID, {
    "email":user.email,
    "name":user.name,
    "about":user.about,
    "Address":user.address,
    "fees":user.fees,
    "phone":user.phone




  }).subscribe(
      res => {
        console.log('sucess');
        document.getElementById('editModal').style.display = 'none';
      },
      err => {
        console.log(err);
        document.getElementById('editModal').style.display = 'none';
      }
    );


  }


}
