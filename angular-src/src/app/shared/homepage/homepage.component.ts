import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  contactName: string;
  contactEmail: string;
  contactMessage: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.contactName = "";
    this.contactEmail = "";
    this.contactMessage = "";
  }

  submitContactForm() {
    let REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.contactEmail || !this.contactName || !this.contactMessage) {
      new Noty({
        type: 'warning',
        text: 'Please fill in all fields to send your message',
        timeout: 3000,
        progressBar: true

      }).show();
      return false;
    }
    if (!REGEX.test(this.contactEmail)) {
      new Noty({
        type: 'warning',
        text: 'Please enter a valid email',
        timeout: 3000,
        progressBar: true

      }).show();
      return false;
    }

    let body = {
      email: this.contactEmail,
      name: this.contactName,
      message: this.contactMessage
    };
    this.http.post(appConfig.apiUrl + '/contactus', body).subscribe(
      res => {
        new Noty({
          type: 'info',
          text: 'Your message was submitted successfully',
          timeout: 3000,
          progressBar: true
        }).show();
        return true;
      },
      err => {
        new Noty({
          type: 'error',
          text: 'Something went wrong while submitting your message',
          timeout: 3000,
          progressBar: true
        }).show()
        return false;
      }
    );
  }

}
