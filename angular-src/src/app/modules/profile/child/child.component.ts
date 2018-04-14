import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {appConfig} from "../../../app.config";

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
  token = localStorage.getItem('authentication');

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
              private http: HttpClient,
              private httpClient: HttpClient,
              private auth: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserID = this.currentUser._id;
//  this.httpClient.get('http://localhost:3000/api/user/getUserInfo/'+this.currentUserID,
    this.getChildSchedule();

  }

  onUploadFinished(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      console.log(status);
      return;
    }
    this.currentUser.photo = response.filename;
    this.http.patch(appConfig.apiUrl + '/user/updateImage/' + this.currentUser._id, {photo: response.filename})
      .subscribe((res: any) => {
        localStorage.setItem('authentication', res.data);
        new Noty({
          type: 'success',
          text: "Your Image uploaded successfully!",
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  getChildSchedule() {

    this.httpClient.get('http://localhost:3000/api/schedule/getChildSchedule/' + this.currentUserID, this.httpOptions).subscribe((res: any) => {
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
