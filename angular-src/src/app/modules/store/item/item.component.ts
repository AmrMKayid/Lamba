import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {StoreService} from '../../../services/store.service';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id: string;
  item: Object;
  user: Object;
  owner: boolean

  constructor(private route: ActivatedRoute,
              private http: Http,
              private storeservice: StoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.storeservice.getItem(this.id).subscribe(res => {
          this.item = res.data;
          this.user = res.seller;
          this.owner = res.owner;
          console.log(this.user);
        },
        error => {
          return this.router.navigate(["/store/myitems/view"]);
        });

    });
  }


  deleteProduct() {
    this.http.delete('http://localhost:3000/api/store/delete/' + this.item["_id"])
      .subscribe(res => {
        this.router.navigate(["/store/myitems/view"]);
      });

  }

  update() {

    localStorage.setItem("Update", JSON.stringify(this.item));
    this.router.navigate(["/store/myitems/update"]);
  }


}
