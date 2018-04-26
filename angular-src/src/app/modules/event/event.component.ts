import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return localStorage.getItem('authentication');
  }
}
