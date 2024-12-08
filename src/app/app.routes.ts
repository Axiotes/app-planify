import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ActivityComponent } from './pages/activity/activity.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'agenda',
    component: AgendaComponent,
    children: [
      {
        path: 'new-activity',
        component: ActivityComponent,
        data: { type: 'new' },
      },
      {
        path: 'edit-activity/:id',
        component: ActivityComponent,
        data: { type: 'edit' },
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: '/login' },
];
