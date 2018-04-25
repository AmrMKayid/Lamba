import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { appConfig } from "../../../app.config";
import { AuthService } from "../../../services/auth.service";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { enable, destroy } from 'splash-screen';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  user: any;
  currentUser: any;
  token = localStorage.getItem('authentication');
  myChildren = [];

  newChildBtn: boolean;
  closeResult: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  gender;


  constructor(private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private modalService: NgbModal) {
  }

  ngOnInit() {


    this.user = this.auth.getCurrentUser();

    this.http.get(appConfig.apiUrl + '/user/getUserByID/' + this.user._id, this.httpOptions)
      .subscribe(
        (res: any) => {
          this.currentUser = res.data;
        }, (err) => {
          new Noty({
            type: 'error',
            text: err.msg,
            timeout: 1500,
            progressBar: true
          }).show();
        });
    this.getMyChildren(this.user._id);
    this.newChildBtn = false;
    this.getTasks();
  }

  EditInfo(updatedFirstName, updatedMiddleName, updatedLastName,
    updatedStreet, updatedCity, updatedState, updatedZip,
    updatedBirthday, updatedPhone, updatedAbout) {

    let updatedUser = {
      name: {
        firstName: updatedFirstName,
        middleName: updatedMiddleName,
        lastName: updatedLastName
      },
      address: {
        street: updatedStreet,
        city: updatedCity,
        state: updatedState,
        zip: updatedZip
      },
      birthday: updatedBirthday,
      phone: updatedPhone,
      about: updatedAbout,
    };

    this.http.patch(appConfig.apiUrl + '/user/updateUser/' + this.currentUser._id, updatedUser, this.httpOptions).subscribe(
      (res: any) => {

        this.modalref.close();

        new Noty({
          type: 'success',
          text: `You've been successfully updated your info!`,
          timeout: 3000,
          progressBar: true
        }).show();

        this.ngOnInit();

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
          type: 'success',
          text: error.msg,
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
          type: 'success',
          text: error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
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

  viewTask(taskId) {
    this.router.navigate(['schedule/viewtask/', taskId]);
  }

  chooseGender(gender) {
    this.gender = gender
  }




  viewUser(user) {
    this.router.navigate(['profile', user._id]);
  }

  messageUser(user) {
    this.router.navigate(['chat/' + user._id]);
  }

  newChild(childFirstName, childlastName, childUsername, childPassword, childConfirmPassword) {
    if (!childUsername) {
      new Noty({
        type: 'warning',
        text: `Username cannot be empty!`,
        timeout: 2000,
        progressBar: true
      }).show();
      return false;
    }
    if (!(/^[a-z0-9]+$/i.test(childUsername))) {
      new Noty({
        type: 'warning',
        text: `Username cannot have special characters!`,
        timeout: 2000,
        progressBar: true
      }).show();
      return false;
    }
    let newChild = {
      name: {
        firstName: childFirstName,
        lastName: childlastName
      },
      username: childUsername,
      password: childPassword,
      confirmPassword: childConfirmPassword,
      gender: this.gender,
    };

    this.http.post(appConfig.apiUrl + '/auth/child', newChild, this.httpOptions).subscribe(
      (res: any) => {
        this.myChildren = this.myChildren.concat(res.data);
        this.modalref.close();

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

  modalref: NgbModalRef;

  openlg(content) {
    this.modalref = this.modalService.open(content, { size: 'lg' })

    this.modalref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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


  createNewTask(taskName, tasksDescription, studentId) {

    if (!taskName || !tasksDescription) {
      new Noty({
        type: 'error',
        text: "Please fill in all fields.",
        timeout: 3000,
        progressBar: true
      }).show();
    }
    else {

      var taskdata = {
        title: taskName,
        description: tasksDescription,
        userId: this.currentUser._id,
        studentId: studentId
      };


      this.http.post(appConfig.apiUrl + '/task/newTask', taskdata, this.httpOptions).subscribe(
        (res: any) => {

          this.getTasks();

          new Noty({
            type: 'success',
            text: `You've been successfully created New tasks!`,
            timeout: 3000,
            progressBar: true
          }).show();
          this.modalref.close();
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



  }


  getTasks() {
    this.http.get(appConfig.apiUrl + '/task/getTasks/', this.httpOptions)
      .subscribe((res: any) => {
        this.tasks = res.data;
      });

  }

  deleteTask(taskId) {
    this.http.get(appConfig.apiUrl + '/task/deleteTask/' + taskId, this.httpOptions).subscribe((res: any) => {
      this.getTasks();
      });


    new Noty({
      type: 'success',
      text: `Task deleted successfully.`,
      timeout: 3000,
      progressBar: true
    }).show();


  }


}
