import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { Http, Headers} from '@angular/http';
import { ToasterService } from 'angular5-toaster';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {ToasterModule} from 'angular5-toaster';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ProfileComponent} from "./profile.component";
import {AdminComponent} from './admin/admin.component';
import {ParentComponent} from './parent/parent.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ChildComponent} from './child/child.component';
// import {UnVerifiedArticlesComponent} from './admin/admin-functions/un-verified-articles/un-verified-articles.component';
// import {VerifyArticleComponent} from './admin/admin-functions/verify-article/verify-article.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
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
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [CommonModule,HttpModule,HttpClientModule, FormsModule,RouterModule.forChild(appRoutes),
    ReactiveFormsModule,ToasterModule, Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule],
  declarations: [
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent
    // ,UnVerifiedArticlesComponent,
    // VerifyArticleComponent,
    
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [ProfileComponent,AdminComponent]

})
export class ProfileModule {
}
