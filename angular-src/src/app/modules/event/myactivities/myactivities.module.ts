import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MyactivitiesComponent} from './myactivities.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';
import {ViewComponent} from './view/view.component';
import {ImageUploadModule} from "angular2-image-upload";
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: '',
    component: MyactivitiesComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'update',
        component: UpdateComponent
      },
      {
        path: 'view',
        component: ViewComponent
      }
    ]

  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageUploadModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [MyactivitiesComponent, CreateComponent, UpdateComponent, ViewComponent],
  exports: [RouterModule]
})
export class MyactivitiesModule {
}
