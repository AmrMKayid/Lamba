import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
  })
  export class StoreComponent {
  
    constructor() { }
  
    ngOnInit() {
    }
  
  
     buyerId : string ;
     itemId : string ;
    buy() {
  
      this.buyerId = "Test";
      this.itemId = "Test";
      
          let updatedProduct = {
            name: this.buyerId,
            itemId: this.itemId
          };
      
          this.http.patch('http://localhost:3000/api/store/buy/:itemId' + this.itemId , updatedProduct)
            .catch(err => {
              return Observable.throw(err)
            })
            .subscribe(res => {
            });
      
      
   
      
        }
      
  
  }
  