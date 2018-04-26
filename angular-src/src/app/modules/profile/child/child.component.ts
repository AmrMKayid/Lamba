import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { appConfig } from "../../../app.config";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

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
    //  this.httpClient.get(appConfig.apiUrl + '/user/getUserInfo/'+this.currentUserID,
    this.getChildSchedule();
    this.getTasks();
    this.getTeachers();
  }


  viewChild(childID) {
    this.router.navigate(['profile', childID]);
  }

  viewTask(taskId) {
    this.router.navigate(['schedule/viewtask/', taskId]);
  }

  viewUser(user) {
    this.router.navigate(['profile', user._id]);
  }

  messageUser(user) {
    this.router.navigate(['chat/' + user._id]);
  }

  onUploadFinished(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      return;
    }
    this.currentUser.photo = response.filename;
    this.http.patch(appConfig.apiUrl + '/user/updateImage/' + this.currentUser._id, { photo: response.filename })
      .subscribe((res: any) => {
        localStorage.setItem('authentication', res.data);
        this.modalref.close();

        new Noty({
          type: 'success',
          text: "Your Image uploaded successfully!",
          timeout: 3000,
          progressBar: true
        }).show();
      }, error => {
        new Noty({
          type: 'error',
          text: `Something went wrong while uploading your image\n${error.error ? error.error.msg : error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  onUploadFinishedCover(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      return;
    }
    this.currentUser.coverPhoto = response.filename;
    this.http.patch(appConfig.apiUrl + '/user/updateCoverImage/' + this.currentUser._id, { coverPhoto: response.filename })
      .subscribe((res: any) => {
        localStorage.setItem('authentication', res.data);
        this.modalref.close();
        new Noty({
          type: 'success',
          text: "Your Image uploaded successfully!",
          timeout: 3000,
          progressBar: true
        }).show();
      }, error => {
        new Noty({
          type: 'error',
          text: `Something went wrong while uploading your image\n${error.error ? error.error.msg : error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  getChildSchedule() {

    this.httpClient.get(appConfig.apiUrl + '/schedule/getChildSchedule/' + this.currentUserID, this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.saturday;
      this.sun = res.data.sunday;
      this.mon = res.data.monday;
      this.tues = res.data.tuesday;
      this.wed = res.data.wednesday;
      this.thurs = res.data.thursday;
      this.fri = res.data.friday;

    });

  }

  closeResult: string;

  modalref: NgbModalRef;

  open(content) {
    this.modalref = this.modalService.open(content)

    this.modalref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  tasks = [];

  getTasks() {
    this.http.get(appConfig.apiUrl + '/task/getTasks/', this.httpOptions)
      .subscribe((res: any) => {
        this.tasks = res.data;

      });
  }


  teachers = [];

  getTeachers() {
    this.http.get(appConfig.apiUrl + '/user/getMyTeachers/' + this.currentUser._id, this.httpOptions)
      .subscribe((res: any) => {
        this.teachers = res.data;
      });
  }





}
