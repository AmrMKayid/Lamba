import {Component, OnInit} from '@angular/core';

import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {appConfig} from '../../../app.config';
import {AuthService} from '../../../services/auth.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;


  // Pagination: initializing p to one
  p: number = 1;
  filter;

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
    this.http.get(appConfig.apiUrl + '/activity/view', {headers: headers}).map((res) => res.json())
      .subscribe((data: any) => {
        this.myactivities = data.data.filter(event => event.isVerified == true);
      }, error => {
        new Noty({
          type: 'success',
          text: `Couldn't retrieve activity(s): ${error.error ? error.error.msg : error.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  deleteActivity(activityId) {
    this.http.delete(appConfig.apiUrl + '/activity/delete/' + activityId)
      .subscribe(res => {
        new Noty({
          type: 'info',
          text: "Activity deleted successfullys!",
          timeout: 3000,
          progressBar: true
        }).show();

        this.getMyActivities();

      });

  }

  goingActivities(activity) {
    this.eventservice.goingActivities(activity).subscribe((data: any) => {
      for (var i = 0; i < this.myactivities.length; i++) {
        if (this.myactivities[i]._id == data._id) {
          this.myactivities[i].going_user_id = data.going_user_id;
        }
      }

      this.getMyActivities();

    }, error => {
      new Noty({
        type: 'info',
        text: "You are already going to this activity.",
        timeout: 3000,
        progressBar: true
      }).show();
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

    this.http.patch(appConfig.apiUrl + '/event/edit/' + activityId, editedActivity)
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: 'Updated!',
          timeout: 3000,
          progressBar: true
        }).show();

        localStorage.setItem("Update", null);
        this.router.navigate(["/store/myitems/view"]);
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

  addToFav(activity) {
    this.eventservice.addToFavorites(activity._id).subscribe(
      (res: any) => {
        new Noty({
          type: 'success',
          text: `Added to favorites successfully`,
          timeout: 1500,
          progressBar: true
        }).show();
      },
      err => {
        if (err.status === 304) {
          new Noty({
            type: 'info',
            text: `Activity is already in your favorites.`,
            timeout: 1500,
            progressBar: true
          }).show();
        } else {
          new Noty({
            type: 'warning',
            text: `Something went wrong while adding to favorites: ${err.error ? err.error.msg : err.msg}`,
            timeout: 2000,
            progressBar: true
          }).show();
        }
      }
    );
  }

}
