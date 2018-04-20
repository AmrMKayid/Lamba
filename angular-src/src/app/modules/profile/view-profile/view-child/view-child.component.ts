import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appConfig} from "../../../../app.config";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.scss']
})
export class ViewChildComponent implements OnInit {

  @Input() child;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  token = localStorage.getItem('authentication');
  closeResult: string;
  isparent: boolean;
  isteacher: boolean;


  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private httpClient: HttpClient,
              private auth: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.isparent = (this.child.parent_id === this.auth.getCurrentUser()._id);
    this.isteacher = (this.auth.getCurrentUser().students.indexOf(this.child._id) !== -1); // could be needed in tasks
    if (this.isparent) {
      this.getChildSchedule();
      this.getTasks();
      this.getTeachers();
    }

  }


  getChildSchedule() {

    this.httpClient.get(appConfig.apiUrl + '/schedule/getChildSchedule/' + this.child._id, this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.saturday;
      this.sun = res.data.sunday;
      this.mon = res.data.monday;
      this.tues = res.data.tuesday;
      this.wed = res.data.wednesday;
      this.thurs = res.data.thursday;
      this.fri = res.data.friday;
    });
  }

  updateChildSchedule(Slot, newtitle, newdescription, newurl, thisday) {
    if (newtitle === "") {
      newtitle = Slot.slot.title;
    }
    if(newdescription === ""){
      newdescription = Slot.slot.description;
    }
    if (newurl === ""){
      newurl = Slot.slot.url;
    }
    var body = {
      title: newtitle,
      description: newdescription,
      url: newurl,
      day: thisday
    }



    this.httpClient.patch(appConfig.apiUrl + '/schedule/updateChildSchedule/' + Slot._id + '/' + this.child._id, body, this.httpOptions).subscribe((res: any) => {
      if (thisday == 'saturday') {
        var index = this.sat.indexOf(Slot);
        this.sat[index] = res.data;
      }
      if (thisday == 'sunday') {
        var index = this.sun.indexOf(Slot);
        this.sun[index] = res.data;
      }
      if (thisday == 'monday') {
        var index = this.mon.indexOf(Slot);
        this.mon[index] = res.data;
      }
      if (thisday == 'tuesday') {
        var index = this.tues.indexOf(Slot);
        this.tues[index] = res.data;
      }
      if (thisday == 'wednesday') {
        var index = this.wed.indexOf(Slot);
        this.wed[index] = res.data;
      }
      if (thisday == 'thursday') {
        var index = this.thurs.indexOf(Slot);
        this.thurs[index] = res.data;
      }
      if (thisday == 'friday') {
        var index = this.fri.indexOf(Slot);
        this.fri[index] = res.data;
      }
    });

    this.modalref.close();

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


  tasks = [];
    getTasks() {
      this.http.get(appConfig.apiUrl + '/task/getChildTasks/'+this.child._id, this.httpOptions)
        .subscribe((res: any) => {
          this.tasks = res.data;

        });
    }


    teachers = [];
    getTeachers() {
      this.http.get(appConfig.apiUrl + '/user/getMyTeachers/'+this.child._id, this.httpOptions)
        .subscribe((res: any) => {
          this.teachers = res.data;

        });
    }


}
