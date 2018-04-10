import { Component, OnInit } from '@angular/core';

import { Http, Headers } from '@angular/http';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  myitems : any;

  constructor(      private http: Http,
        private toaster: ToasterService,
        private router: Router,
        private storeservice : StoreService,) { this.getMyItems() }



  getMyItems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization',  localStorage.getItem('authentication'));
    this.http.get('http://localhost:3000/api/store/getItemsById', {headers:headers}).map((res) => res.json())
      .subscribe((data: any) => {
        this.myitems = data.data;
        console.log(this.myitems);

      });
  }



  ngOnInit() {
  }

}
