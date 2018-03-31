import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TscheduleComponent } from './tschedule/tschedule.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';



const AppRoutes: Routes = [
  { path: 'tschedule', component: TscheduleComponent },
  { path: 'task', component: TaskComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TscheduleComponent,
    TaskComponent
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
