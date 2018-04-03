import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {TscheduleComponent} from './tschedule/tschedule.component';
import {TaskComponent} from './task/task.component';
import {CscheduleComponent} from './cschedule/cschedule.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      {
        path: 'Task',
        component: TaskComponent,

      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    TscheduleComponent,
    CscheduleComponent,
    TaskComponent
  ]
})
export class ScheduleModule { }
