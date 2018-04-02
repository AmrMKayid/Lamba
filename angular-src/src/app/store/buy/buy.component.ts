import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Observable} from 'rxjs/Rx';

Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css']
  })
  export class BuyComponent  {
  
    constructor( private toaster: ToasterService,
    private http : Http,
    private storeservice : StoreService,
    private router : Router) { }

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
  
