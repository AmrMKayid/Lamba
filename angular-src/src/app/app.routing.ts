import {Routes, RouterModule} from '@angular/router';

import {HomepageComponent} from './shared/homepage/homepage.component';
import {LoginComponent} from './shared/login/login.component';
import {RegisterComponent} from './shared/register/register.component';
import {AuthGuard} from './guards/auth.guard';


const appRoutes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule'},
  {path: 'schedule', loadChildren: './modules/schedule/schedule.module#ScheduleModule'},
  {path: 'resources', loadChildren: './modules/resources/resources.module#ResourcesModule'},
  {path: 'store', loadChildren: './modules/store/store.module#StoreModule'},

  // otherwise redirect to shared
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);
