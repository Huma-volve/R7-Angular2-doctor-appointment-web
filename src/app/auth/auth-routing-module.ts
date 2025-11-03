import { Login } from './components/login/login';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './components/view/view';

const routes: Routes = [
  {
    path: '',
    component: View,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login, title: 'Login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
