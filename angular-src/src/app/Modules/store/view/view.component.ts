import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../../services/store.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  itemsCount: number; // Total number of items
  limit: number; // Number of items per page
  curPage: number; // Number of the current page

  // TODO create item interface ?
  items: any[]; // Current items
  pages: any[]; // Holds the numbers of the pages available to be picked


  constructor(private StoreService: StoreService) {
    this.getItemCount();
    this.limit = 2;
    this.curPage = 1;
    this.loadItems();
    this.pages = [1, 2, 3, 4, 5];
  }

  ngOnInit() {
  }

  getItemCount() {
    this.StoreService.itemsCount().subscribe((data: any) => {
      this.itemsCount = data.data;
    });
  }

  loadItems() {
    this.StoreService.viewItems(this.limit, this.curPage).subscribe((data: any) => {
      this.items = data.data;

    });
  }

  loadPage(page: number) {
    this.curPage = page;
    this.loadItems();
  }

}
