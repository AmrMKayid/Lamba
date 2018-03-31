import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyitemsComponent } from './myitems/myitems.component';
import { RouterModule, Routes } from '@angular/router';

const myRoots: Routes = [
  { path: 'myitems', component: MyitemsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(myRoots)
  ],
  declarations: [MyitemsComponent]
})
export class StoreModule { }
