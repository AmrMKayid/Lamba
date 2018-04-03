import {Routes, RouterModule} from '@angular/router';

import {HomepageComponent} from './home/homepage/homepage.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';

const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', loadChildren: './Modules/profile/profile.module#ProfileModule'},
  {path: 'schedule', loadChildren: './Modules/schedule/schedule.module#ScheduleModule'},
  {path: 'resources', loadChildren: './Modules/resources/resources.module#ResourcesModule'},
  {path: 'store', loadChildren: './Modules/store/store.module#StoreModule'},

  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(appRoutes);
