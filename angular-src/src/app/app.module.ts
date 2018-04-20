import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import * as Noty from 'noty';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AuthGuard} from './guards/auth.guard';
import {ErrorInterceptorProvider} from './helpers/error.interceptor';
import {JwtInterceptorProvider} from './helpers/jwt.interceptor';
import {AuthService} from './services/auth.service';
import {AllUsersComponent} from './shared/all-users/all-users.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HomepageComponent} from './shared/homepage/homepage.component';
import {LoginComponent} from './shared/login/login.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RegisterRoleComponent} from './shared/register-role/register-role.component';
import {RegisterComponent} from './shared/register/register.component';
import {HeaderComponent} from './modules/profile/components/header/header.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

/* Search Library */
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {NotificationsComponent} from './shared/notifications/notifications.component';
import {NotificationService} from './services/notification.service';
import { RequestsComponent } from './shared/requests/requests.component';
import {InterestsComponent} from './shared/interests/interests.component';
import {NgxCarouselModule} from "ngx-carousel";



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
    NotificationsComponent,
    HeaderComponent,
    RequestsComponent
    InterestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCarouselModule,
    Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgbDropdownModule.forRoot(),
    TranslateModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService,
    NotificationService
  ],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule {
}
