import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { afterLoginGuard } from './core/guards/after-login-guard-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
    canActivate: [afterLoginGuard],
  },
  {
    path: 'layout',
    loadComponent: () => import('./shared/components/layout/layout').then((c) => c.Layout),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((c) => c.HomeComponent),
        title: 'home',
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./features/user-profile/user-profile').then((c) => c.UserProfile),
        title: 'user-profile',
      },
      {
        path: 'doctors-list',
        loadComponent: () =>
          import('./features/doctors-list/doctors-list').then((c) => c.DoctorsList),
        title: 'doctors-list',
      },
      {
        path: 'appointment/:id',
        loadComponent: () =>
          import('./features/appointment/appointment').then((c) => c.Appointment),
        title: 'appointment',
      },
      {
        path: 'map',
        loadComponent: () => import('./features/map/map').then((c) => c.Map),
        title: 'map',
      },
      {
        path: 'booking',
        loadComponent: () => import('./features/booking/booking').then((c) => c.Booking),
      },
      {
        path: 'contactUs',
        loadComponent: () => import('./features/contact-us/contact-us').then((c) => c.ContactUS),
        title: 'contactUs',
      },
      {
        path: 'chats',
        loadComponent: () => import('./features/chat/chat-list/chat-list').then((c) => c.ChatPage),
      },
    ],
  },
];
