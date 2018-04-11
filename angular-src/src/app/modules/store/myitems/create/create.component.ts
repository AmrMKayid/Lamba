import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoreService } from '../../../../services/store.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


	name: string;
	description: string;
	quantity: number;
	price: number;
	item_type: string;
	item_condition: string;
	picture_url: string;
	token = localStorage.getItem('authentication');

	constructor(
		private http: Http,
		private storeservice: StoreService,
		private router: Router) { }

	ngOnInit() {
		this.item_condition = '';
	}

	onSubmit() {

		if (!this.picture_url) {
			new Noty({
				type: 'error',
				text: 'You need to upload a photo',
				timeout: 5000,
				progressBar: true
			}).show();
		}
		else if (!this.name || !this.description || !this.quantity || !this.price || !this.item_type || !this.item_condition) {
			new Noty({
				type: 'error',
				text: 'You have to provide an item name',
				timeout: 5000,
				progressBar: true
			}).show();
		}
		else {
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
				if (!res.err) {
					this.router.navigate(["/store/view"]);
				}
				else {
					new Noty({
						type: 'error',
						text: 'you have to provide an Item Name',
						timeout: 5000,
						progressBar: true
					}).show();
				}
			});
		}

	}

	onUploadFinished(event) {

		var response = JSON.parse(event.serverResponse._body);
		var status = event.serverResponse.status;

		if (status != 200) {
			new Noty({
				type: 'error',
				text: 'response.err',
				timeout: 5000,
				progressBar: true
			}).show();
			console.log(status);
			return;
		}

		this.picture_url = response.filename;
		new Noty({
			type: 'success',
			text: 'Your photo was uploaded to the server successfully!',
			timeout: 4000,
			progressBar: true
		}).show();
	}
}
