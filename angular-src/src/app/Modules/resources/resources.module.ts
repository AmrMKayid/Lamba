import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';

import { ArticlesService } from './articles.service';
import { PostArticlesComponent } from './post-articles/post-articles.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { SafeHtmlPipe } from './view-article/safe-html.pipe';
import { ViewArticlesComponent } from './view-articles/view-articles.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ViewArticlesComponent,
  },
  {
    path: 'post',
    component: PostArticlesComponent,
  },
  {
    //TODO: Check out el custom URLs (fromt the title for instance)
    path: 'id/:id',
    component: ViewArticleComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    SafeHtmlPipe,
    PostArticlesComponent,
    ViewArticlesComponent,
    ViewArticleComponent
  ],
  providers: [
    ArticlesService
  ],
  exports: []
})
export class ResourcesModule {
}
