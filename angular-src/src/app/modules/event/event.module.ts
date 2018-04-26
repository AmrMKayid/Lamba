import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {EventComponent} from './event.component';
import {LoadChildren} from '@angular/router';
import {EventService} from '../../services/event.service';
import {ViewComponent} from './view/view.component';
import {HttpModule} from '@angular/http';
import {ActivityComponent} from './activity/activity.component';
import {NgxPaginationModule} from 'ngx-pagination';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: 'myactivities',
        loadChildren: './myactivities/myactivities.module#MyactivitiesModule'
      },
      {
        path: 'view',
        component: ViewComponent
      },
      {
        path: 'view/:id',
        component: ActivityComponent
      }
    ]

  }
];


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgxPaginationModule


  ],
  declarations: [
    EventComponent,
    ViewComponent,
    ActivityComponent
  ],


  exports: [RouterModule],
  providers: [EventService]
})
export class EventModule {
}
