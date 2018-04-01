import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyitemsComponent } from './myitems.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

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
			}
		]
    
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyitemsComponent, CreateComponent, UpdateComponent, ViewComponent],
  exports: [RouterModule]
})
export class MyitemsModule { }
