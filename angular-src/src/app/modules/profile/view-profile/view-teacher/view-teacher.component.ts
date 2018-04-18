import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appConfig} from "../../../../app.config";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  userID;
  @Input() user;
  isParent :boolean;
  closeResult: string;
  //schedule
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private http: HttpClient,
              private modalService: NgbModal) {
  }


  ngOnInit() {
    this.isParent = (this.auth.getCurrentUser().role === 'Parent');
    //schedule
    this.sat = this.user.schedule.table.saturday;
    this.sun = this.user.schedule.table.sunday;
    this.mon = this.user.schedule.table.monday;
    this.tues = this.user.schedule.table.tuesday;
    this.wed = this.user.schedule.table.wednesday;
    this.thurs = this.user.schedule.table.thursday;
    this.fri = this.user.schedule.table.friday;
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
}
