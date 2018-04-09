import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToasterService} from 'angular5-toaster/src/toaster.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";



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
  currentUser: any;
  fees: number;
  phone: number;

  ///////////////// Schedule////////////////////////////


  public day = [];
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  ///////////////////////////////////////////////////////////

  constructor(private router: Router,
              private httpClient: HttpClient,
              private http: Http,
              private auth: AuthService,
              private toaster: ToasterService) {
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    //this.currentUserID = this.currentUser;
     console.log(this.currentUser._id);
//  this.httpClient.get('http://localhost:3000/api/user/getUserInfo/'+this.currentUserID,
    //this.getTeacherSchedule();

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
////////////////////////////// schedule/////////////////////////////////////////////////////
  getTeacherSchedule() {

    this.http.get('http://localhost:3000/api/schedule/getTeacherSchedule/' + this.currentUserID, this.currentUserID).subscribe((res: any) => {
      this.sat = res.data.table.saturday;
      this.sun = res.data.table.sunday;
      this.mon = res.data.table.monday;
      this.tues = res.data.table.tuesday;
      this.wed = res.data.table.wednesday;
      this.thurs = res.data.table.thursday;
      this.fri = res.data.table.friday;

    });

  }


  updateChildSchedule(Slot , newtitle , newdescription , newurl , thisday){
    var body = {
      title : newtitle,
      description : newdescription,
      url : newurl,
      day : thisday
    }

    this.http.patch('http://localhost:3000/api/schedule/updateTeacherSchedule' + Slot._id , body , this.currentUserID).subscribe((res: any) =>{
      if(thisday == 'saturday') {
        var index = this.sat.indexOf(Slot);
        this.sat[index] = res.data;
        console.log(this.sat[index]);
      }
      if(thisday == 'sunday') {
        var index = this.sun.indexOf(Slot);
        this.sun[index] = res.data;
        console.log(this.sun[index]);
      }
      if(thisday == 'monday') {
        var index = this.mon.indexOf(Slot);
        this.mon[index] = res.data;
        console.log(this.mon[index]);
      }
      if(thisday == 'tuesday') {
        var index = this.tues.indexOf(Slot);
        this.tues[index] = res.data;
        console.log(this.tues[index]);
      }
      if(thisday == 'wednesday') {
        var index = this.wed.indexOf(Slot);
        this.wed[index] = res.data;
        console.log(this.wed[index]);
      }
      if(thisday == 'thursday') {
        var index = this.thurs.indexOf(Slot);
        this.thurs[index] = res.data;
        console.log(this.thurs[index]);
      }
      if(thisday == 'friday') {
        var index = this.fri.indexOf(Slot);
        this.fri[index] = res.data;
        console.log(this.fri[index]);
      }
    });
  }


  fsat() {
    this.day = this.sat;
  }
  fsun() {
    this.day = this.sun;
  }
  fmon() {
    this.day = this.mon;
  }
  ftues() {
    this.day = this.tues;
  }
  fwed() {
    this.day = this.wed;
  }
  fthurs() {
    this.day = this.thurs;
  }
  ffri() {
    this.day = this.fri;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////


}
