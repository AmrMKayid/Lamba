import {Routes, RouterModule} from '@angular/router';

import {HomepageComponent} from './shared/homepage/homepage.component';
import {LoginComponent} from './shared/login/login.component';
import {RegisterComponent} from './shared/register/register.component';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', loadChildren: './Modules/profile/profile.module#ProfileModule'},
  {path: 'schedule', loadChildren: './Modules/schedule/schedule.module#ScheduleModule'},
  {path: 'resources', loadChildren: './Modules/resources/resources.module#ResourcesModule'},
  {path: 'store', loadChildren: './Modules/store/store.module#StoreModule'},

  // otherwise redirect to shared
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(appRoutes);
