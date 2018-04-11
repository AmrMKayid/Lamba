import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

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
  constructor(
  private route: ActivatedRoute,
  private toaster: ToasterService,
  private http : Http,
  private storeservice : StoreService,
  private router : Router) { }

  ngOnInit() {
  	   this.route.params.subscribe(params => {
       		this.id = params['id'];
 
       		this.storeservice.getItem(this.id).subscribe(res => {
         this.item = res.data;
         this.user = res.seller;
         this.owner = res.owner;
         console.log(this.user);
		    }, 
        error => {return this.router.navigate(["/store/myitems/view"]);});
          
      });
  }



}
