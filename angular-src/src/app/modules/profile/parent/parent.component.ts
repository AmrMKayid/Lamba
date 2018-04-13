import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { appConfig } from "../../../app.config";
import { AuthService } from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  currentUser;
  myChildren = [];

  newChildBtn: boolean;
  closeResult: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };


  constructor(private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private modalService: NgbModal) {
  }

  ngOnInit() {

    this.currentUser = this.auth.getCurrentUser();
    this.getMyChildren(this.currentUser._id);
    this.newChildBtn = false;

  }

  getMyChildren(parentID) {
    this.http.get(appConfig.apiUrl + '/user/getUserChildren/' + parentID)
      .subscribe((res: any) => {
        this.myChildren = res.data;
      });
  }

  viewChild(childID) {
    this.router.navigate(['profile', childID]);
  }

  newChild(childFirstName, childlastName, childUsername, childPassword, childConfirmPassword, childGender) {

    let newChild = {
      name: {
        firstName: childFirstName,
        lastName: childlastName
      },
      username: childUsername,
      password: childPassword,
      confirmPassword: childConfirmPassword,
      gender: childGender,
    };


    this.http.post(appConfig.apiUrl + '/auth/child', newChild, this.httpOptions).subscribe(
      (res: any) => {
        this.myChildren = this.myChildren.concat(res.data);

        new Noty({
          type: 'success',
          text: `You've been successfully created New Child Account!`,
          timeout: 3000,
          progressBar: true
        }).show();
      },
      error => {
        new Noty({
          type: 'error',
          text: error.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
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


  createNewTask(taskName, tasksDescription, studentId) {

    var taskdata = {
      title: taskName,
      description: tasksDescription,
      userId: this.currentUser._id,
      studentId: studentId
    };


    this.http.post('http://localhost:3000/api/task/newTask', taskdata,this.httpOptions).subscribe();
  }


}
