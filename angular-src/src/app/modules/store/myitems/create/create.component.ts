import {Http, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {StoreService} from '../../../../services/store.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
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
      "background-color": "red",
      "color": "white",
      "margin-left": "10px"
    },
    layout: {
      "background-color": "white",
      "color": "gray",
      "font-size": "15px",
      "margin": "10px",
      "padding-top": "5px"
    },
    previewPanel: {
      "background-color": "white",
      "color": "white"
    }
  }


  name: string;
  description: string;
  quantity: number;
  price: number;
  item_type: string;
  item_condition: string;
  picture_url: string;
  token = localStorage.getItem('authentication');

  constructor(private http: Http,
              private storeservice: StoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.item_condition = '';
  }

  onSubmit() {

    if (!this.picture_url) {
      new Noty({
        type: 'warning',
        text: 'No photo was uploaded\nYou have to upload a photo first before submitting the form',
        timeout: 3000,
        progressBar: true
      }).show();
    }
    else if (!this.name || !this.description || !this.quantity || !this.price || !this.item_type || !this.item_condition) {

      new Noty({
        type: 'warning',
        text: 'Missing Field(s)\nOne or more field(s) are missing. Please provide all fields',
        timeout: 3000,
        progressBar: true
      }).show();
    }
    else {
      const item = {
        name: this.name,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        item_type: this.item_type,
        item_condition: this.item_condition,
        picture_url: this.picture_url
      }

      this.storeservice.createItem(item).subscribe(res => {
        if (!res.err) {
          this.router.navigate(["/store/view"]);
        }
        else {
          new Noty({
            type: 'warning',
            text: 'You need to upload a photo\nyou have to provide an Item Name',
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
        type: 'warning',
        text: 'Could not upload photo\n' + response.err,
        timeout: 3000,
        progressBar: true
      }).show();
      return;
    }

    this.picture_url = response.filename;
    new Noty({
      type: 'success',
      text: 'Photo uploaded successfully',
      timeout: 3000,
      progressBar: true
    }).show();
  }
}
