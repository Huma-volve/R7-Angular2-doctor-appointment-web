import { Login } from './components/login/login';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { View } from './components/view/view';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Register } from './components/register/register';
import { VerifyCode } from './components/verify-code/verify-code';

@NgModule({
  declarations: [View, Login, Register, VerifyCode],
  imports: [CommonModule, AuthRoutingModule, FormsModule, RouterModule],
})
export class AuthModule {}
