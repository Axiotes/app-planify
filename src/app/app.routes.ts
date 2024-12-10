import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'agenda',
    component: AgendaComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'new-activity',
    component: ActivityComponent,
    canActivate: [authGuard()],
    data: { type: 'new' },
  },
  {
    path: 'edit-activity/:id',
    component: ActivityComponent,
    canActivate: [authGuard()],
    data: { type: 'edit' },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard()],
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: '/login' },
];
