import { Login } from './components/login/login';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './components/view/view';
import { Register } from './components/register/register';
import { VerifyCode } from './components/verify-code/verify-code';

const routes: Routes = [
  {
    path: '',
    component: View,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login, title: 'Login' },
      { path: 'register', component: Register, title: 'register' },
      { path: 'verify/:phoneNumber', component: VerifyCode, title: 'verify-code' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
