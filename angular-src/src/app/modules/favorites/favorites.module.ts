import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavArticlesComponent } from './fav-articles/fav-articles.component';
import { FavItemsComponent } from './fav-items/fav-items.component';
import { FavActivitiesComponent } from './fav-activities/fav-activities.component';
import { FavoritesComponent } from './favorites.component'
const appRoutes: Routes = [
  {
    path: '',
    component: FavoritesComponent
  }
  // },
  // {
  // path: 'post',
  // component: PostArticlesComponent,
  // },
  // {
  // path: 'edit/:id',
  // component: EditArticlesComponent,
  // },
  // {
  // path: 'id/:id',
  // component: ViewArticleComponent
  // }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    FavArticlesComponent,
    FavItemsComponent,
    FavActivitiesComponent,
    FavoritesComponent
  ],
  providers: [
  ],
  exports: []
})
export class FavoritesModule {
}
