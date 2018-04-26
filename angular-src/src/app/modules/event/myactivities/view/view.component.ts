import {Component, OnInit} from '@angular/core';

import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../../services/event.service';
import {Router} from '@angular/router';
import {appConfig} from "../../../../app.config";
import {AuthService} from "../../../../services/auth.service";
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  //myactivities: any;
  activity: any;
  myactivities = [];
  activityId: string;
  name: string;
  price: number;
  current: any;
  key: string = 'name';
  description: string;
  place: string;
  activity_type: string;
  newOrEdit = false;
  createNew = false;
  editPressed = false;
  reverse: boolean = false;
  picture_url: string;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private http: Http,
              private router: Router,
              private eventservice: EventService,
              private auth: AuthService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.getMyActivities()
  }


  getMyActivities() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    this.http.get(appConfig.apiUrl + '/activity/myActivities/view', {headers: headers}).map((res) => res.json())
      .subscribe((data: any) => {
        this.myactivities = data.data;
      });
  }

  deleteActivity(activityId) {
    this.http.delete(appConfig.apiUrl + '/activity/delete/' + activityId)
      .subscribe(res => {
        new Noty({
          type: 'info',
          text: "Activity deleted successfully!",
          timeout: 3000,
          progressBar: true
        }).show();

        this.getMyActivities();

      });

  }


  editActivity(activity) {
    this.activity = activity;
    var activityId = activity._id;

    this.name = this.activity.name;
    this.price = this.activity.price;
    this.description = this.activity.description;
    this.place = this.activity.place;
    this.activity_type = this.activity.activity_type;


    let editedActivity = {
      name: this.name,
      price: Number(this.price),
      description: this.description,
      place: this.place,
      activity_type: this.activity_type,
      updated_at: Date.now()
    };

    this.http.patch(appConfig.apiUrl + '/activity/edit/' + activityId, editedActivity)
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: 'Activity updated successfully!',
          timeout: 3000,
          progressBar: true
        }).show();

        localStorage.setItem("Update", null);
        this.router.navigate(["/event/myactivities/view"]);
      });

  }


  ngOnInit() {
  }

  close() {

        this.router.navigate(["/event/myactivities/view"]);
        localStorage.setItem("Update", 'null')

      }

      viewInfo(_id) {
        this.router.navigate(['/event/view/' + _id]);
      }


      modalref: NgbModalRef;
      closeResult: string;


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
