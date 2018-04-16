import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {StoreComponent} from './store.component';
import {LoadChildren} from '@angular/router';
import {StoreService} from '../../services/store.service';
import {ViewComponent} from './view/view.component';
import {HttpModule} from '@angular/http';
import {ItemComponent} from './item/item.component';
// import {ToasterModule} from 'angular5-toaster';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

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
    HttpModule,
    RouterModule.forChild(routes),
    // ToasterModule
  ],
  declarations: [
    StoreComponent,
    ViewComponent,
    ItemComponent
  ],


  exports: [RouterModule],
  providers: [StoreService]
})
export class StoreModule {
}
