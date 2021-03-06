import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConfig } from "../../../../app.config";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { ModalDismissReasons, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  userID;
  @Input() user;
  isParent: boolean;
  closeResult: string;
  selectedChild: string;
  //schedule
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  public children = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };


  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private router: Router) {
  }


  ngOnInit() {
    this.isParent = (this.auth.getCurrentUser().role === 'Parent' && this.user.isVerified);
    //schedule
    this.sat = this.user.schedule.table.saturday;
    this.sun = this.user.schedule.table.sunday;
    this.mon = this.user.schedule.table.monday;
    this.tues = this.user.schedule.table.tuesday;
    this.wed = this.user.schedule.table.wednesday;
    this.thurs = this.user.schedule.table.thursday;
    this.fri = this.user.schedule.table.friday;

    if (this.isParent) {
      this.getChildrenForParent();
    }
  }


  getChildrenForParent() {
    this.httpClient.get(appConfig.apiUrl + '/user/myChildren', this.httpOptions).subscribe(
      (res: any) => {
        this.children = res.data;
      },
      (err) => {
        new Noty({
          type: 'error',
          text: `Something went wrong while retrieving your children: ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

  sendRequest() {

    this.httpClient.post(appConfig.apiUrl + '/request/create/' + this.user._id + "/" + this.selectedChild, {}, this.httpOptions).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: `Request sent to the teacher`,
          timeout: 2000,
          progressBar: true
        }).show();
      }, err => {
        new Noty({
          type: 'warning',
          text: `Something went wrong while requesting the teacher: ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

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

  viewChild(childID) {
    this.router.navigate(['profile', childID]);
  }

  viewTask(taskId) {
    this.router.navigate(['schedule/viewtask/', taskId]);
  }

  book() {
    this.router.navigate(['profile/book/', this.user._id]);
  }

  messageUser() {
    this.router.navigate(['chat/' + this.user._id]);
  }
}
