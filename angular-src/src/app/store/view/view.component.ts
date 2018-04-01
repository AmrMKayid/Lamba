import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  itemsCount : number;
  limit : number; // Number of items per page
  curPage : number; // Number of the current page

  // TODO create item interface ?
  items[] : any; // Current items

  constructor(private StoreService : StoreService) { }

  ngOnInit() {
    this.getItemCount();
    this.limit = 2;
    this.curPage = 1;
    this.items = [];
    this.loadItems();
  }

  getItemCount(){
    this.StoreService.itemsCount().subscribe((data:any)=>{
      this.itemsCount = data.data;
    });
  }

  loadItems(){
      this.StoreService.viewItems(this.limit,this.curPage).subscribe((data:any)=>{
        this.items = data.data;
        console.log(this.items);

      });
  }


}
