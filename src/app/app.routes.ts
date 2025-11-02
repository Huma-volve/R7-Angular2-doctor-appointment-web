import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login').then(c => c.LoginComponent)
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password').then(c => c.ResetPasswordComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then(c => c.HomeComponent)
  }
];
