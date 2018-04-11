import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  myitems: any[];
  itemId: string;
  name: string;
  price: number;
  current: any;
  key: string = 'name';
  description: string;
  quantity: number;
  item_type: string;
  item_condition: string;
  newOrEdit = false; createNew = false; editPressed = false;
  reverse: boolean = false;
  picture_url: string;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(
    private http: Http,
    private router: Router,
    private storeservice: StoreService,
  ) { }

  editItem(item) {
    this.name = item.name;
    this.price = item.price;
    this.itemId = item._id;


    let editedItem = {
      name: this.name,
      price: Number(this.price),
      description: this.description,
      quantity: Number(this.quantity),
      item_type: this.item_type,
      item_condition: this.item_condition
    };

    this.http.patch('http://localhost:3000/api/store/edit/:itemId' + this.itemId, editedItem)
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: 'Updated',
          timeout: 2000,
          progressBar: true
        }).show();

        //
        //  NEEDS TO GET THE PRODUCTS AGAIN TO REFRESH BUT NOT PART OF THE USER STORY
        //
        this.newOrEdit = false;
        this.editPressed = false;
      });

  }


  deleteProduct(itemId) {
    this.http.delete('http://localhost:3000/api/store/delete/:itemId' + this.itemId)
      .subscribe(res => {
        new Noty({
          type: 'warning',
          text: 'Deleted',
          timeout: 3000,
          progressBar: true
        }).show();
        //
        //  NEEDS TO GET THE PRODUCTS AGAIN TO REFRESH BUT NOT PART OF THE USER STORY
        //
      });
  }


  ngOnInit() {

    this.current = JSON.parse(localStorage.getItem('currentUser'))
  };


}
