import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ToasterContainerComponent, ToasterService} from 'angular5-toaster';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  name : string;
  description : string;
  quantity : number;
  price : number;
  item_type: string;
  item_condition: string;
  picture_url : string;
  error : string;
  success : string;


  constructor(private toaster: ToasterService,
  private http : Http,
  private storeservice : StoreService,
  private router : Router) { }

  ngOnInit() {
  	this.item_condition = '';
  }

  onSubmit()
  {
  	
  	this.success ='';	
  	this.error = '';
  	if(!this.picture_url)
  	{
  		this.error = 'you need to upload a photo';
  	}
  	else if(!this.name || !this.description || !this.quantity || !this.price || !this.item_type || !this.item_condition)
  	{
  		this.error = "One or More fields are missing";
  		this.toaster.pop({
                  type: 'failure',
                  title: "Missing the Item name!",
                  body: "you have to provide an Item Name",
                  timeout: 3000
                });
  		this.success ='';
  	}
  	else
  	{
  		const item = {
  			name: this.name,
  			description: this.description,
  			quantity: this.quantity,
  			price: this.price,
  			item_type: this.item_type,
  			item_condition: this.item_condition,
  			picture_url: this.picture_url
  		}

		console.log(item);
		this.storeservice.createItem(item).subscribe(res => {
			if(!res.err)
			{
				 this.router.navigate(["/store/myitems/view"]);
			}
			else
			{
				this.error = res.err;
			}
		});
  	}

  }

  onUploadFinished(event)
  {
  	this.success ='';	
  	this.error = '';
  	var response = JSON.parse(event.serverResponse._body);
  	var status = event.serverResponse.status;

  	if(status!= 200)
  	{
  		this.error = "Couldn't upload image";
  		console.log(status);
  		return;
  	}

  	this.picture_url = response.filename;
  	this.success = 'Picture uploaded successfully';

  }
}
