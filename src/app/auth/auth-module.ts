import { Login } from './components/login/login';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { View } from './components/view/view';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Register } from './components/register/register';
import { VerifyCode } from './components/verify-code/verify-code';
import { VerifyRegister } from './components/verify-register/verify-register';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [View, Login, Register, VerifyCode, VerifyRegister],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://cure-doctor-booking.runasp.net'],
        sendAccessToken: true,
      },
    }),
  ],
})
export class AuthModule {}
