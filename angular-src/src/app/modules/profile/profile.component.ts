import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular5-toaster';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // TO GET CURRENT USER INFO
  // JSON.parse(localStorage.getItem('currentUser'))

  constructor() { }

  ngOnInit() {
  }

}
