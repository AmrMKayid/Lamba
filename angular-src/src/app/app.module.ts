import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {ToasterModule} from 'angular5-toaster';

import {routing} from './app.routing';


import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';


import {LoginComponent} from './components/home/login/login.component';
import {RegisterComponent} from './components/home/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
     HttpModule,
    HttpClientModule,
    ToasterModule,

  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
