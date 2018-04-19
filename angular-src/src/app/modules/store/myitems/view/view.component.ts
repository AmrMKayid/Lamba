import {Component, OnInit} from '@angular/core';

import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {StoreService} from '../../../../services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  myitems= [];

  constructor(private http: Http,
              private router: Router,
              private storeservice: StoreService) {
    this.getMyItems()
  }


  getMyItems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', localStorage.getItem('authentication'));
    this.http.get('http://localhost:3000/api/store/getItemsById', {headers: headers}).map((res) => res.json())
      .subscribe((data: any) => {
        this.myitems = data.data;
      });
  }

  deleteProduct(itemId) {
    this.http.delete('http://localhost:3000/api/store/delete/' + itemId)
      .subscribe(res => {
        new Noty({
          type: 'error',
          text: 'Deleted!',
          timeout: 3000,
          progressBar: true
        }).show();

        this.getMyItems();

      });

  }

  update(item) {

    localStorage.setItem("Update", JSON.stringify(item));
    this.router.navigate(["/store/myitems/update"]);
  }


  ngOnInit() {
  }

  viewInfo(_id) {
    this.router.navigate(['/store/view/' + _id]);
  }

}
