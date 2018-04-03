import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ToasterModule, ToasterService } from 'angular5-toaster';
import { SafeHtmlPipe } from './post/safe-html.pipe';
import { routing } from './app.routing';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { JwtInterceptorProvider } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { PostComponent } from './post/post.component';
import { CscheduleComponent } from './cschedule/cschedule.component';
import { TaskComponent } from './task/task.component';
import { TscheduleComponent } from './tschedule/tschedule.component';
// import { StoreComponent } from './store/store.component';
// import { MyitemsComponent } from './store/myitems/myitems.component';
// import { ViewComponent } from './store/view/view.component';
// import { CreateComponent } from './store/myitems/create/create.component';
// import { UpdateComponent } from './store/myitems/update/update.component';
import { RouterModule, Routes } from '@angular/router';
//ERR NOT FOUND --SOLVED npm i -S bootstrap --npm i -S @nebular/theme
// import { NbThemeModule } from '@nebular/theme';
import { LoadChildren } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    PostComponent,
    CscheduleComponent,
    TaskComponent,
    TscheduleComponent,
    // StoreComponent,
    // MyitemsComponent,
    // ViewComponent,
    // CreateComponent,
    // UpdateComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,
    NgbModule.forRoot(),
    QuillModule
    // NbThemeModule.forRoot({ name: 'default' })
  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService,
    // ToasterService,
    Http,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
