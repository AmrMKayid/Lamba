import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/profile/admin/admin.component';
import { ParentComponent } from './components/profile/parent/parent.component';
import { TeacherComponent } from './components/profile/teacher/teacher.component';
import { ChildComponent } from './components/profile/child/child.component';
import { UnVerifiedArticlesComponent } from './components/admin-functions/un-verified-articles/un-verified-articles.component';
import { VerifyArticleComponent } from './components/admin-functions/verify-article/verify-article.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent,
    UnVerifiedArticlesComponent,
    VerifyArticleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
