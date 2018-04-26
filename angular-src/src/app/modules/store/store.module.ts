import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {StoreComponent} from './store.component';
import {LoadChildren} from '@angular/router';
import {StoreService} from '../../services/store.service';
import {ViewComponent} from './view/view.component';
import {HttpModule} from '@angular/http';
import {ItemComponent} from './item/item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

/* Search Library */
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

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
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
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
