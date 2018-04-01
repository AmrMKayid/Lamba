import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyitemsComponent } from './myitems.component';

const routes: Routes = [
	{
		path: '',
		component: MyitemsComponent,
		children: [
		]
    
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyitemsComponent],
  exports: [RouterModule]
})
export class MyitemsModule { }
