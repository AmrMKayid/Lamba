import { Component, OnInit, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { appConfig } from "../../../../app.config";
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
  //isInitialized = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  token = localStorage.getItem('authentication');
  childId: string;
  closeResult: string;


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
    this.childId = this.route.snapshot.params.id;
    this.getChildById();
    console.log(this.child);
  }
  getChildById(){
    this.httpClient.get('http://localhost:3000/api/user/getChild/' + this.childId , this.httpOptions).subscribe((res: any) => {
      this.child= res.data;


    }
      , error => {
        new Noty({
          type: 'error',
          text: error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  getChildSchedule() {

    this.httpClient.get('http://localhost:3000/api/schedule/getChildSchedule/' + this.childId, this.httpOptions).subscribe((res: any) => {
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
    var body = {
      title: newtitle,
      description: newdescription,
      url: newurl,
      day: thisday
    }


    console.log(body);
    console.log(Slot._id);

    this.httpClient.patch('http://localhost:3000/api/schedule/updateChildSchedule/' + Slot._id+'/'+this.childId , body, this.httpOptions).subscribe((res: any) => {
      if (thisday == 'saturday') {
        var index = this.sat.indexOf(Slot);
        this.sat[index] = res.data;
        console.log(this.sat[index]);
      }
      if (thisday == 'sunday') {
        var index = this.sun.indexOf(Slot);
        this.sun[index] = res.data;
        console.log(this.sun[index]);
      }
      if (thisday == 'monday') {
        var index = this.mon.indexOf(Slot);
        this.mon[index] = res.data;
        console.log(this.mon[index]);
      }
      if (thisday == 'tuesday') {
        var index = this.tues.indexOf(Slot);
        this.tues[index] = res.data;
        console.log(this.tues[index]);
      }
      if (thisday == 'wednesday') {
        var index = this.wed.indexOf(Slot);
        this.wed[index] = res.data;
        console.log(this.wed[index]);
      }
      if (thisday == 'thursday') {
        var index = this.thurs.indexOf(Slot);
        this.thurs[index] = res.data;
        console.log(this.thurs[index]);
      }
      if (thisday == 'friday') {
        var index = this.fri.indexOf(Slot);
        this.fri[index] = res.data;
        console.log(this.fri[index]);
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


}
