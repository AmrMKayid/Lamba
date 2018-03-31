import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SellComponent } from './sell/sell.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
	{
	path: '',
    component: StoreComponent,
    children: [
     {
        path: 'sell',
        component: SellComponent
      }
    ]
    
    }];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellComponent],
  exports: [RouterModule]
})
export class StoreModule { }
