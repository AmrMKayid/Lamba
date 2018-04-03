import {Routes, RouterModule} from '@angular/router';

import {HomepageComponent} from './components/home/homepage/homepage.component';
import {LoginComponent} from './components/home/login/login.component';
import {RegisterComponent} from './components/home/register/register.component';
import {ProfileComponent} from "./components/profile/profile.component";
import { CscheduleComponent } from './cschedule/cschedule.component';
import { TaskComponent } from './task/task.component';
import { TscheduleComponent } from './tschedule/tschedule.component';
import { PostComponent } from './post/post.component';
const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "profile", loadChildren: './components/profile/profile.module#ProfileModule'},
  { path: 'tschedule', component: TscheduleComponent },
  { path: 'task', component: TaskComponent },
  { path: 'cschedule', component: CscheduleComponent },
  { path: 'post', component: PostComponent },
	// {path: 'store',
  //   loadChildren: './store/store.module#StoreModule'
  // },


  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(appRoutes);
