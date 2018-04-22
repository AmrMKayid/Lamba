import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Http, Headers, HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageUploadModule} from "angular2-image-upload";
import {MatDialogModule} from "@angular/material";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './profile.component';
import {AdminComponent} from './admin/admin.component';
import {ParentComponent} from './parent/parent.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ChildComponent} from './child/child.component';
import {UnVerifiedArticlesComponent} from './admin/un-verified-articles/un-verified-articles.component';
import {ViewParentComponent} from './view-profile/view-parent/view-parent.component';
import {ViewTeacherComponent} from './view-profile/view-teacher/view-teacher.component';
import {ViewChildComponent} from './view-profile/view-child/view-child.component';
import {VerifyTeacherComponent} from './admin/verify-teacher/verify-teacher.component';
import {TranslateModule} from '@ngx-translate/core';
import {DashboardComponent} from './admin/dashboard/dashboard.component'
import {StatModule} from './admin/stat/stat.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material';
import {ArticlesService} from '../resources/articles.service';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {AddTagsComponent} from './admin/add-tags/add-tags.component';
import {MatInputModule} from '@angular/material';
import {DeleteTagsComponent} from './admin/delete-tags/delete-tags.component';
import {UnVerifiedActivitiesComponent} from './admin/un-verified-activities/un-verified-activities.component';
import {AddAdminComponent} from './admin/add-admin/add-admin.component';
import {AdminFormComponent} from './admin/admin-form/admin-form.component';
import {SafeHtmlPipe} from './admin/un-verified-articles/safe-html.pipe';
import {UserVerificationComponent} from './admin/user-verification/user-verification.component';
import {InterviewRequestComponent} from './interview-request/interview-request.component';
import { BookingTeacherComponent } from './booking-teacher/booking-teacher.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ReportsComponent } from './admin/reports/reports.component';

const appRoutes: Routes = [
  {
    path: 'me',
    component: MyProfileComponent,
  },
  {
    path: 'book',
    component: BookingTeacherComponent,
  },
  {
    path: 'viewbookings',
    component: ViewBookingsComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'un-verified-articles',
        component: UnVerifiedArticlesComponent
      },
      {
        path: 'un-verified-activities',
        component: UnVerifiedActivitiesComponent
      },
      {
        path: 'verify-teachers',
        component: VerifyTeacherComponent
      },
      {
        path: 'add-admin',
        component: AddAdminComponent
      },
      {
        path: 'verification-requests',
        component: UserVerificationComponent
      },
      {
        path:'reports',
        component: ReportsComponent
      }
    ]
  },
  {
    path: 'request-interview',
    component: InterviewRequestComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule, HttpClientModule,
    ReactiveFormsModule, Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule,
    ImageUploadModule.forRoot(),
    RouterModule.forChild(appRoutes),
    NgbModule.forRoot(),
    TranslateModule.forChild(),
    MDBBootstrapModule.forRoot(),
    NgbDropdownModule.forRoot(),
    StatModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent,
    UnVerifiedArticlesComponent,
    VerifyTeacherComponent,
    ViewParentComponent,
    ViewTeacherComponent,
    ViewChildComponent,
    SidebarComponent,
    DashboardComponent,
    MyProfileComponent,
    AddTagsComponent,
    DeleteTagsComponent,
    UnVerifiedActivitiesComponent,
    AddAdminComponent,
    AdminFormComponent,
    SafeHtmlPipe,
    UserVerificationComponent,
    InterviewRequestComponent,
    BookingTeacherComponent,
    ViewBookingsComponent,
    ReportsComponent

  ],
  providers: [
    HttpClient,
    ArticlesService
  ],
  bootstrap: [ProfileComponent, AdminComponent],
  entryComponents: [AddTagsComponent, DeleteTagsComponent, AdminFormComponent]

})
export class ProfileModule {
}
