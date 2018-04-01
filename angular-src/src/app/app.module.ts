import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {ToasterModule,ToasterService} from 'angular5-toaster';

import {routing} from './app.routing';


import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {LoginComponent} from './components/home/login/login.component';
import {RegisterComponent} from './components/home/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
     HttpModule,
    HttpClientModule,
    ToasterModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService,
    Http,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
