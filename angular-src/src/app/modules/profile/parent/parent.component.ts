import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToasterService } from 'angular5-toaster/src/toaster.service';
import { appConfig } from "../../../app.config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  currentUser;
  myChildren;

  newChildBtn: boolean;
  closeResult: string;

  constructor(private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private toaster: ToasterService,
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

  newChild(childFirstName , childlastName , childUsername , childPassword , childConfirmPassword ,childGender) {

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

    console.log(newChild);

    let autorization = { Authorization: localStorage.getItem('authorization') }

    this.http.post(appConfig.apiUrl + '/auth/child', newChild, { headers: autorization }).subscribe(
      data => {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You've been successfully created New Child Account!",
          timeout: 3000
        });
      },
      error => {
        console.log(error)
        this.toaster.pop({
          type: 'error',
          title: "Error!",
          body: error.error.msg,
          timeout: 3000
        });
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


}
