import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { SellComponent } from './sell/sell.component';


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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
