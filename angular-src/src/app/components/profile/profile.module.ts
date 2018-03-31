import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ProfileComponent} from "./profile.component";
import {AdminComponent} from './admin/admin.component';
import {ParentComponent} from './parent/parent.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ChildComponent} from './child/child.component';
import {UnVerifiedArticlesComponent} from './admin/admin-functions/un-verified-articles/un-verified-articles.component';
import {VerifyArticleComponent} from './admin/admin-functions/verify-article/verify-article.component';

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
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent,
    UnVerifiedArticlesComponent,
    VerifyArticleComponent
  ]
})
export class ProfileModule {
}
