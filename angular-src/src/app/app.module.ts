import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';

import {ProfileComponent} from './components/profile/profile.component';
import {AdminComponent} from './components/profile/admin/admin.component';
import {ParentComponent} from './components/profile/parent/parent.component';
import {TeacherComponent} from './components/profile/teacher/teacher.component';
import {ChildComponent} from './components/profile/child/child.component';
import {LoginComponent} from './components/home/login/login.component';
import {RegisterComponent} from './components/home/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
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
