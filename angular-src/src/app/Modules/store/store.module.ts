import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { LoadChildren } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { ViewComponent } from './view/view.component';
import { HttpModule } from '@angular/http';

const routes: Routes = [
	{
		path: '',
		component: StoreComponent,
		children: [
			{
				path: 'myitems',
				loadChildren: './myitems/myitems.module#MyitemsModule'
			},
			{
				path : 'view',
				component : ViewComponent
			}
		]

    }
];


@NgModule({
  imports: [
    CommonModule,
		 HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  	StoreComponent,
  	ViewComponent
  ],


  exports: [RouterModule],
  providers: [StoreService]
})
export class StoreModule { }
