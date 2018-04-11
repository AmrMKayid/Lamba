import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToasterService} from 'angular5-toaster/src/toaster.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  currentUser;
  currentUserID;

  ///////////////// Schedule////////////////////////////
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
              private auth: AuthService,
              private toaster: ToasterService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserID = this.currentUser._id;
    console.log(this.currentUser._id);
//  this.httpClient.get('http://localhost:3000/api/user/getUserInfo/'+this.currentUserID,
    this.getChildSchedule();

  }

  getChildSchedule() {

    this.httpClient.get('http://localhost:3000/api/schedule/getChildSchedule/' + this.currentUserID , this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.saturday;
      this.sun = res.data.sunday;
      this.mon = res.data.monday;
      this.tues = res.data.tuesday;
      this.wed = res.data.wednesday;
      this.thurs = res.data.thursday;
      this.fri = res.data.friday;

    });

  }





}
