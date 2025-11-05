import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.HomeComponent),
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./features/user-profile/user-profile').then((c) => c.UserProfile),
  },
];
