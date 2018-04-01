import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TscheduleComponent } from './tschedule/tschedule.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { CscheduleComponent } from './cschedule/cschedule.component';



const AppRoutes: Routes = [
  { path: 'tschedule', component: TscheduleComponent },
  { path: 'task', component: TaskComponent },
  { path: 'cschedule', component: CscheduleComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TscheduleComponent,
    TaskComponent,
    CscheduleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
