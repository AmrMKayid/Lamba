import {Http, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../../services/event.service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {appConfig} from "../../../../app.config";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  customStyle = {
    selectButton: {
      "background-color": "#5495ff",
      "color": "#FFF"
    },
    clearButton: {
      "background-color": "white",
      "border-radius": "25px",
      "color": "red",
      "margin-left": "10px"
    },
    layout: {
      "background-color": "white",
      "color": "gray",
      "font-size": "15px",
      "margin": "10px",
      "padding-top": "5px",
      "width": "500px"
    },
    previewPanel: {
      "background-color": "white",
      "color": "white"
    }
  }


  name: string;
  description: string;
  place: string;
  price: number;
  activity_type: string;
  picture_url: string;
  token = localStorage.getItem('authentication');
  isVerified: boolean;

  constructor(private http: Http,
              private eventservice: EventService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    var currentUser = this.auth.getCurrentUser();
    this.isVerified = currentUser.isVerified;
    if (!this.isVerified) {
      new Noty({
        type: 'error',
        text: 'Please verify your account first by applying to an interview in order to be able to post a new activity',
        timeout: 10000
      }).show();
      this.router.navigate(["/profile/request-interview"]);

    }
  }

  onSubmit() {

    if (!this.picture_url) {
      new Noty({
        type: 'error',
        text: "No photo was uploaded\nYou have to upload a photo first before submitting the form",
        timeout: 3000,
        progressBar: true
      }).show();
    }
    else if (!this.name || !this.description || !this.place || !this.price || !this.activity_type) {
      new Noty({
        type: 'error',
        text: "Missing Field(s)\nOne or more field(s) are missing. Please provide all fields",
        timeout: 3000,
        progressBar: true
      }).show();
    }
    else {
      const activity = {
        name: this.name,
        description: this.description,
        place: this.place,
        price: this.price,
        activity_type: this.activity_type,
        picture_url: this.picture_url
      }

      this.eventservice.createActivity(activity).subscribe(res => {
        if (!res.err) {
          this.router.navigate(["/event/view"]);
        }
        else {
          new Noty({
            type: 'error',
            text: "You need to upload a photo\nyou have to provide an activity name",
            timeout: 3000,
            progressBar: true
          }).show();
        }
      });
    }

  }

  onUploadFinished(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      new Noty({
        type: 'error',
        text: "could not upload photo",
        timeout: 3000,
        progressBar: true
      }).show();
      return;
    }

    this.picture_url = response.filename;

    new Noty({
      type: 'success',
      text: "Your photo was uploaded to the server successfully!",
      timeout: 3000,
      progressBar: true
    }).show();
  }
}
