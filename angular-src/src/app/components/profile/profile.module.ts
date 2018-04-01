import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ToasterService} from 'angular5-toaster';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {ToasterModule} from 'angular5-toaster';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Http, Headers, HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {ProfileComponent} from "./profile.component";
import {AdminComponent} from './admin/admin.component';
import {ParentComponent} from './parent/parent.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ChildComponent} from './child/child.component';
import {UnVerifiedArticlesComponent} from './admin/un-verified-articles/un-verified-articles.component';
import {VerifyArticleComponent} from './admin/verify-article/verify-article.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,

      },
      {
        path: 'parent',
        component: ParentComponent
      },
      {
        path: 'teacher',
        component: TeacherComponent
      },
      {
        path: 'child',
        component: ChildComponent
      },
      {
        path: 'admin/un-verified-articles',
        component: UnVerifiedArticlesComponent
      },
      {
        path: 'admin/verify-articles/:id',
        component: VerifyArticleComponent

      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }


    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ToasterModule,
    ReactiveFormsModule, ToasterModule, Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule,
    RouterModule.forChild(appRoutes),
    ToasterModule
  ],
  declarations: [
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent,
    UnVerifiedArticlesComponent,
    VerifyArticleComponent,

  ],
  providers: [
    HttpClient
  ],
  bootstrap: [ProfileComponent, AdminComponent]

})
export class ProfileModule {
}
