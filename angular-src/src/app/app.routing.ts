import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/home/login/login.component';
import {RegisterComponent} from './components/home/register/register.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(appRoutes);
