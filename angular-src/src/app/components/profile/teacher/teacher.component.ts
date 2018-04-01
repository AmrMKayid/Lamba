import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular5-toaster';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',

  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

firstName:string;
middleName: string;
lastName:string;
city:string;
state:string;
zip : number;
street: string;
email:string;
about: string ;
currentUser:string;
fees:number;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
private http: Http,
private toaster : ToasterService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user.Id;
    console.log(this.currentUser);
  }
  onEditInfo():void{
  const  user = {
    name:{
    firstName : this.firstName,
    middleName  : this.middleName,
    lastName :this.lastName,
  },
      email:this.email,
          about:this.about,
  address:{
    city: this.city,
     state : this.state,
     zip : this.zip,
     street:this.street,
  } ,


    fees : this.fees


  }
  console.log(user);
  this.http.patch('http://localhost:3000/api/user/updateUser/5abfea2777cb580a103e8554',{
"name":user.name,
"email":user.email,
"about":user.about,
"address":user.address,
"fees" : user.fees


}).subscribe(
  res=>{
    console.log('sucess');
document.getElementById('editModal').style.display='none';
  },
  err => {
console.log(err);
document.getElementById('editModal').style.display='none';
}

);



  }


}
