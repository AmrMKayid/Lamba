import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbThemeModule } from '@nebular/theme'
import { AppComponent } from './app.component';
import { LoadChildren } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
  	path: 'store',
    loadChildren: './store/store.module#StoreModule'
  }

];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NbThemeModule.forRoot({ name: 'default' }),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
