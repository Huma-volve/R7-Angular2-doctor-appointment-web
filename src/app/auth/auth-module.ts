import { Login } from './components/login/login';
import { routes } from './../app.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { View } from './components/view/view';

@NgModule({
  declarations: [View, Login],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
