import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
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
        loadComponent: () =>
          import('./features/user-profile/user-profile').then((c) => c.UserProfile),
      },
      {
        path: 'doctors-list',
        loadComponent: () =>
          import('./features/doctors-list/doctors-list').then((c) => c.DoctorsList),
      },
      {
        path: 'appointment/:id',
        loadComponent: () =>
          import('./features/appointment/appointment').then((c) => c.Appointment),
      },
      {
        path: 'map',
        loadComponent: () => import('./features/map/map').then((c) => c.Map),
      },
      {
        path: 'booking',
        loadComponent: () => import('./features/booking/booking').then((c) => c.Booking),
      },
      {
        path: 'contactUs',
        loadComponent: () => import('./features/contact-us/contact-us').then((c) => c.ContactUS),
      },
      {
        path: 'chats',
        loadComponent: () => import('./features/chat/chat-list/chat-list').then((c) => c.ChatPage),
      },
    ],
  },
];
