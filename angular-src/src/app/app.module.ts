import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular5-toaster';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ProfileModule } from './Modules/profile/profile.module';
import { AuthService } from './services/auth.service';
import { ResourcesModule } from './Modules/resources/resources.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,

    ProfileModule,
    ResourcesModule,

    NgbModule.forRoot(),
    routing,
    
  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
