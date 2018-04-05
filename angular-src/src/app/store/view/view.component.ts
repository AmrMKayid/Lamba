import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  itemsCount : number; // Total number of items
  limit : number; // Number of items per page
  curPage : number; // Number of the current page

  // TODO create item interface ?
  items :any[]; // Current items
  pages :any[]; // Holds the numbers of the pages available to be picked


  constructor(private StoreService : StoreService) {
  }

  ngOnInit() {

  }


}
