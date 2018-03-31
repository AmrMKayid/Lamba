import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { LoadChildren } from '@angular/router';

const routes: Routes = [
  {
  	path: 'store',
  	component: StoreComponent,
    loadChildren: 'app/store/store.module#StoreModule'
  },
  {
  	path: 'st',
  	component: StoreComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
