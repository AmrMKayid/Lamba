import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyitemsComponent } from './myitems.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { ImageUploadModule } from "angular2-image-upload";
import { FormsModule } from '@angular/forms';
import {ToasterModule} from 'angular5-toaster';
import { ItemComponent } from './item/item.component';




const routes: Routes = [
	{
		path: '',
		component: MyitemsComponent,
		children: [
			{
				path:'create',
				component: CreateComponent
			},
			{
				path: 'update',
				component: UpdateComponent
			},
			{
				path: 'view',
				component: ViewComponent
			},
			{
				path: 'view/:id',
				component: ItemComponent
			}
		]
    
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   	ImageUploadModule.forRoot(),
   	FormsModule,
   	ToasterModule
  ],
  declarations: [MyitemsComponent, CreateComponent, UpdateComponent, ViewComponent, ItemComponent],
  exports: [RouterModule]
})
export class MyitemsModule { }
