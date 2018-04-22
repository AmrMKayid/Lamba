import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {StatModule} from '../stat/stat.module';

// import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    DashboardRoutingModule,
    StatModule
  ],
  declarations: [
    // DashboardComponent
  ]
})
export class DashboardModule {
}
