import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyitemsComponent } from './myitems.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { LikeComponent } from './like/like.component';
import { ImageUploadModule } from "angular2-image-upload";
import { FormsModule } from '@angular/forms';
import {ToasterModule} from 'angular5-toaster';




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
				path:'like',
				component: LikeComponent
			},
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
  declarations: [MyitemsComponent, CreateComponent, UpdateComponent, ViewComponent, LikeComponent ],
  exports: [RouterModule]
})
export class MyitemsModule { }
