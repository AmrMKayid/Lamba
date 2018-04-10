import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToasterModule} from 'angular5-toaster/src/toaster.module';
import {ToasterService} from 'angular5-toaster/src/toaster.service';

import {routing} from './app.routing';

import {AppComponent} from './app.component';

import {AuthGuard} from './guards/auth.guard';
import {ErrorInterceptorProvider} from './helpers/error.interceptor';
import {JwtInterceptorProvider} from './helpers/jwt.interceptor';
import {AuthService} from './services/auth.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';


import {LoginComponent} from './shared/login/login.component';
import {RegisterComponent} from './shared/register/register.component';
import {HomepageComponent} from './shared/homepage/homepage.component';
import {ResourcesModule} from "./modules/resources/resources.module";
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {AllUsersComponent} from './shared/all-users/all-users.component';
import {RegisterRoleComponent} from './shared/register-role/register-role.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    AllUsersComponent,
    RegisterRoleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,
    // ResourcesModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot()
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
