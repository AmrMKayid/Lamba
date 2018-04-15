import {Http, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {EventService} from '../../../../services/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

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

  constructor(private toaster: ToasterService,
              private http: Http,
              private eventservice: EventService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {

    if (!this.picture_url) {
      this.toaster.pop({
        type: 'error',
        title: "No photo was uploaded",
        body: "You have to upload a photo first before submitting the form",
        timeout: 10000
      });
    }
    else if (!this.name || !this.description || !this.place || !this.price || !this.activity_type ) {
      this.toaster.pop({
        type: 'error',
        title: "Missing Field(s)",
        body: "One or more field(s) are missing. Please provide all fields",
        timeout: 10000
      });
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

      console.log(activity);
      this.eventservice.createActivity(activity).subscribe(res => {
        if (!res.err) {
          this.router.navigate(["/event/view"]);
        }
        else {
          this.toaster.pop({
            type: 'res.err',
            title: "You need to upload a photo",
            body: "you have to provide an activity name",
            timeout: 10000
          });
        }
      });
    }

  }

  onUploadFinished(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      this.toaster.pop({
        type: 'error',
        title: "could not upload photo",
        body: response.err,
        timeout: 10000
      });
      console.log(status);
      return;
    }

    this.picture_url = response.filename;
    this.toaster.pop({
      type: 'success',
      title: "Successfull operation",
      body: "Your photo was uploaded to the server successfully!",
      timeout: 10000
    });
  }
}
