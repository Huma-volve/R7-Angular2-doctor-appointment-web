import { UpcomingBooking } from './features/upcoming-booking/upcoming-booking';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { ChatList } from './features/chat/chat-list/chat-list';
import { Chat } from './features/chat/chat/chat';

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
        loadComponent: () =>
          import('./features/user-profile/user-profile').then((c) => c.UserProfile),
      },
      {
        path: 'doctors-list',
        loadComponent: () => import('./features/doctors-list/doctors-list').then((c) => c.DoctorsList),

      },
      {
        path: 'appointment/:id',
        loadComponent: () => import('./features/appointment/appointment').then((c) => c.Appointment),

      },
      {
        path: 'map',
        loadComponent: () => import('./features/map/map').then((c) => c.Map),

      },
      {
        path: 'booking',
        loadComponent: () => import('./features/booking/booking').then((c) => c.Booking),
        children: [
          { path: '', redirectTo: 'allBooking', pathMatch: 'full' },
          {
            path: 'allBooking',
            loadComponent: () =>
              import('./features/all-booking/all-booking').then((c) => c.AllBooking),
          },
          {
            path: 'upcomingBooking',
            loadComponent: () =>
              import('./features/upcoming-booking/upcoming-booking').then((c) => c.UpcomingBooking),
          },
          {
            path: 'completedBooking',
            loadComponent: () =>
              import('./features/completed-booking/completed-booking').then(
                (c) => c.CompletedBooking
              ),
          },
          {
            path: 'canceledBooking',
            loadComponent: () =>
              import('./features/canceled-booking/canceled-booking').then((c) => c.CanceledBooking),
          },
        ],

      },
      {
        path: 'contactUs',
        loadComponent: () => import('./features/contact-us/contact-us').then((c) => c.ContactUS),
      },
      { path: 'chats', component: ChatList },
      { path: 'chats/:id', component: Chat },
    ],
  },
];
