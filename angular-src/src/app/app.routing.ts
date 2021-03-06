import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './shared/homepage/homepage.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AllUsersComponent } from "./shared/all-users/all-users.component";
import { RegisterRoleComponent } from './shared/register-role/register-role.component';
import { ChatComponent } from "./shared/chat/chat.component";
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { RequestsComponent } from './shared/requests/requests.component';
import { InterestsComponent } from "./shared/interests/interests.component";
import { ActivationComponent } from './shared/activation/activation.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { LoginGuard } from './guards/login.guard';
import { NonAuthGuard } from './guards/non-auth.guard';


const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'activation', canActivate: [NonAuthGuard], component: ActivationComponent },
  { path: 'forgot', canActivate: [NonAuthGuard], component: ForgotPasswordComponent },
  { path: 'reset/:token', canActivate: [NonAuthGuard], component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-role', component: RegisterRoleComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'search', canActivate: [AuthGuard], component: AllUsersComponent },
  { path: 'chat/:id', canActivate: [AuthGuard], component: ChatComponent },
  { path: 'chat', canActivate: [AuthGuard], component: ChatComponent },
  { path: 'notifications', canActivate: [AuthGuard], component: NotificationsComponent },
  { path: 'requests', canActivate: [AuthGuard], component: RequestsComponent },
  { path: 'profile', canActivate: [LoginGuard], loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './modules/schedule/schedule.module#ScheduleModule' },
  { path: 'resources', canActivate: [AuthGuard], loadChildren: './modules/resources/resources.module#ResourcesModule' },
  { path: 'store', canActivate: [AuthGuard], loadChildren: './modules/store/store.module#StoreModule' },
  { path: 'event', canActivate: [AuthGuard], loadChildren: './modules/event/event.module#EventModule' },
  { path: 'favorites', canActivate: [AuthGuard], loadChildren: './modules/favorites/favorites.module#FavoritesModule' },

  // otherwise redirect to shared
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(appRoutes);
