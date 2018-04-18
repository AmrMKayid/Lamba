import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import {StatModule} from '../stat/stat.module';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    DashboardRoutingModule,
    StatModule
  ],
  declarations: [
    // DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent
  ]
})
export class DashboardModule {
}
