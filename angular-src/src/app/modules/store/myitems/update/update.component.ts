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
  description: string;
  quantity: number;
  item_type: string;
  item_condition: string;
  picture_url: string;
  itemString: any;
  item: any;

  constructor(private http: Http,
              private router: Router,
              private storeservice: StoreService,) {

                this.itemString = localStorage.getItem("Update");
                this.item = JSON.parse(this.itemString);
                this.name= this.item.name;
                this.price = this.item.price;
                this.description = this.item.description;
                this.quantity = this.item.quantity;
                this.item_type = this.item.item_type ;
                this.item_condition = this.item.item_condition ;
  }


  editItem() {
    var itemId = this.item._id;

    let editedItem = {
      name: this.name,
      price: Number(this.price),
      description: this.description,
      quantity: Number(this.quantity),
      item_type: this.item_type,
      item_condition: this.item_condition,
      updated_at: Date.now()
    };

    this.http.patch('http://localhost:3000/api/store/edit/' + itemId, editedItem)
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
