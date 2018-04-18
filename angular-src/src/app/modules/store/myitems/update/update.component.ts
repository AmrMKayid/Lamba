import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {StoreService} from '../../../../services/store.service';
import {Router} from '@angular/router';

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
  newOrEdit = false;
  createNew = false;
  editPressed = false;
  reverse: boolean = false;
  picture_url: string;
  Name;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private http: Http,
              private router: Router,
              private storeservice: StoreService,) {
  }


  editItem() {
    var itemString = localStorage.getItem("Update");
    var item = JSON.parse(itemString)._id;

    let editedItem = {
      name: this.name,
      price: Number(this.price),
      description: this.description,
      quantity: Number(this.quantity),
      item_type: this.item_type,
      item_condition: this.item_condition,
      updated_at: Date.now()
    };

    this.http.patch('http://localhost:3000/api/store/edit/' + item, editedItem)
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: 'Updated!',
          timeout: 3000,
          progressBar: true
        }).show();

        localStorage.setItem("Update", null);
        this.router.navigate(["/store/myitems/view"]);
      });

  }

  close() {

    this.router.navigate(["/store/myitems/view"]);
    localStorage.setItem("Update", 'null')

  }


  ngOnInit() {
  };


}
