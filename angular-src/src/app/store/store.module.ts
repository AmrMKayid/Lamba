import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { LoadChildren } from '@angular/router';
import { StoreService } from '../services/store.service';

const routes: Routes = [
	{
		path: '',
		component: StoreComponent,
		children: [
			 {
				path: 'myitems',
				loadChildren: './myitems/myitems.module#MyitemsModule'
			 }
		]
    
    }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  StoreComponent
  ],
  exports: [RouterModule],
   providers: [StoreService]
})
export class StoreModule { }
