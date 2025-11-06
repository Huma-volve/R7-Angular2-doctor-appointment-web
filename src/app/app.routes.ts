import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'layout',
    loadComponent: () => import('./shared/components/layout/layout').then((c) => c.Layout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((c) => c.HomeComponent),
      },
      {
        path: 'user-profile',
        loadComponent: () => import('./features/user-profile/user-profile').then((c) => c.UserProfile),
      },
      {
        path: 'doctors-list',
        loadComponent: () => import('./features/doctors-list/doctors-list').then((c) => c.DoctorsList),
      },
    ],
  },

];
