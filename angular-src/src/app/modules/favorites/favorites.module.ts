import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavItemsComponent } from './fav-items/fav-items.component';
import { FavActivitiesComponent } from './fav-activities/fav-activities.component';
import { FavoritesComponent } from './favorites.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavResourcesComponent } from './fav-resources/fav-resources.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


const appRoutes: Routes = [
  {
    path: '',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    Ng2SearchPipeModule,  
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    FavItemsComponent,
    FavActivitiesComponent,
    FavoritesComponent,
    FavResourcesComponent
  ],
  providers: [
  ],
  exports: []
})
export class FavoritesModule {
}
