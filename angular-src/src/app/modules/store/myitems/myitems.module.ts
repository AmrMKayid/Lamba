import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MyitemsComponent} from './myitems.component';
import {CreateComponent} from './create/create.component';
import {ViewComponent} from './view/view.component';
import {ImageUploadModule} from "angular2-image-upload";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: '',
    component: MyitemsComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent
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
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot()
    // ToasterModule
  ],
  declarations: [MyitemsComponent, CreateComponent, ViewComponent],
  exports: [RouterModule]
})
export class MyitemsModule {
}
