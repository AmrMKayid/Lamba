import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {StoreComponent} from './store.component';
import {LoadChildren} from '@angular/router';
import {StoreService} from '../../services/store.service';
import {ViewComponent} from './view/view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular5-toaster/src/toaster.module';
import {ToasterService} from 'angular5-toaster/src/toaster.service';

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
        path: 'view',
        component: ViewComponent

      }
    ]

  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    StoreComponent,
    ViewComponent
  ],
  exports: [RouterModule],
  providers: [StoreService]
})
export class StoreModule {
}
