import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {TscheduleComponent} from './tschedule/tschedule.component';
import {TaskComponent} from './task/task.component';
import {CscheduleComponent} from './cschedule/cschedule.component';
import {RouterModule, Routes} from '@angular/router';
const appRoutes: Routes = [
  {
    path: '',
    //set default
  },
  {
    path: 'tschedule',
  component: TscheduleComponent,
  },
  {
    path: 'viewtask',
  component: TaskComponent,
  },
  {
    path: 'cschedule',
  component: CscheduleComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    TscheduleComponent,
    CscheduleComponent,
    TaskComponent
  ]
})
export class ScheduleModule { }
