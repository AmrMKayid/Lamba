import {Component, OnInit} from '@angular/core';

import {Http, Headers} from '@angular/http';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {StoreService} from '../../../../services/store.service';
import {Router} from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  myitems= [];
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
    private storeservice: StoreService,
    private auth: AuthService,
    private modalService: NgbModal) {



      this.getMyItems()
}

editItem(item) {
  this.item = item;
  var itemId = item._id;

  this.name= this.item.name;
  this.price = this.item.price;
  this.description = this.item.description;
  this.quantity = this.item.quantity;
  this.item_type = this.item.item_type ;
  this.item_condition = this.item.item_condition ;


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
   // this.router.navigate(["/store/myitems/update"]);
  }


  ngOnInit() {
  }

  viewInfo(_id) {
    this.router.navigate(['/store/view/' + _id]);
  }


  modalref: NgbModalRef;
  closeResult: string;


  open(content) {
    this.modalref = this.modalService.open(content)

    this.modalref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
