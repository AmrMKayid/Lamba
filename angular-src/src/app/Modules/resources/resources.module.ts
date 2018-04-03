import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuillModule} from 'ngx-quill';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PostComponent} from './post/post.component';
import {SafeHtmlPipe} from './post/safe-html.pipe';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: 'post',
        component: PostComponent,

      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    PostComponent,
    SafeHtmlPipe
  ],
  exports: [PostComponent]
})
export class ResourcesModule {
}
