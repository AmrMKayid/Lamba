import {Routes, RouterModule} from '@angular/router';

import {HomepageComponent} from './shared/homepage/homepage.component';
import {LoginComponent} from './shared/login/login.component';
import {RegisterComponent} from './shared/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {AllUsersComponent} from "./shared/all-users/all-users.component";
import {RegisterRoleComponent} from './shared/register-role/register-role.component';
import {NotificationsComponent} from './shared/notifications/notifications.component';
import {InterestsComponent} from "./shared/interests/interests.component";

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register-role', component: RegisterRoleComponent},
  {path: 'interests', component: InterestsComponent},
  {path: 'users', component: AllUsersComponent},
  {path: 'notifications',canActivate: [AuthGuard], component:NotificationsComponent},
  {path: 'profile', canActivate: [AuthGuard], loadChildren: './modules/profile/profile.module#ProfileModule'},
  {path: 'schedule', canActivate: [AuthGuard], loadChildren: './modules/schedule/schedule.module#ScheduleModule'},
  {path: 'resources', canActivate: [AuthGuard], loadChildren: './modules/resources/resources.module#ResourcesModule'},
  {path: 'store', canActivate: [AuthGuard], loadChildren: './modules/store/store.module#StoreModule'},
  {path: 'event', canActivate: [AuthGuard], loadChildren: './modules/event/event.module#EventModule'},

  // otherwise redirect to shared
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(appRoutes);
