import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { Observable } from 'rxjs';
import { Register } from '../components/register/register';
import { VerifyNumber } from '../model/verify-number';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  register(body: Register): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.register, body);
  }
  login(phoneNumber: string): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.login, phoneNumber);
  }

  verifyRegister(body: VerifyNumber): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: { accessToken: string; refreshToken: string };
    }>(environment.endpoints.auth.verifyRegister, body);
  }

  verifyLogin(body: VerifyNumber): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: { accessToken: string; refreshToken: string };
    }>(environment.endpoints.auth.verifyRegister, body);
  }
  resendOtp(phoneNumber: string): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.resendOtp, phoneNumber);
  }
  googleLogin(idToken: string): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    environment.endpoints.auth.refreshToken;
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.googleLogin, idToken);
  }
  refreshToken(refreshToken: string): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    environment.endpoints.auth.refreshToken;
    return this.http.post<{
      success: boolean;
      message: string;
      data: { accessToken: string; refreshToken: string };
    }>(environment.endpoints.auth.refreshToken, refreshToken);
  }

  logout(): Observable<{ success: boolean; message: string; data: null }> {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http.post<{ success: boolean; message: string; data: null }>(
      environment.endpoints.auth.logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  }
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
