import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Register } from '../components/register/register';
import { VerifyNumber } from '../model/verify-number';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasTokens());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  constructor() {
    if (typeof window !== 'undefined') {
      this.isAuthenticatedSubject.next(this.hasTokens());
    }
  }
  getDoctor(): Observable<any> {
    return this.http.get<any>(`api/Customer/Doctors/GetAllDoctors`);
  }
  setAuthenticated(isAuth: boolean) {
    this.isAuthenticatedSubject.next(isAuth);
    if (isAuth) localStorage.setItem('accessToken', 'token');
    else localStorage.removeItem('accessToken');
  }
  private hasTokens(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  }

  private saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.isAuthenticatedSubject.next(true);
  }

  handleLoginResponse(res: { success: boolean; data: any }) {
    if (res.success && res.data) {
      this.saveTokens(res.data.accessToken, res.data.refreshToken);
    }
  }

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
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: { accessToken: string; refreshToken: string };
      }>(environment.endpoints.auth.verifyRegister, body)
      .pipe(tap((res) => this.handleLoginResponse(res)));
  }

  verifyLogin(body: VerifyNumber): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: { accessToken: string; refreshToken: string };
      }>(environment.endpoints.auth.verifyLogin, body)
      .pipe(tap((res) => this.handleLoginResponse(res)));
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
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: null;
      }>(environment.endpoints.auth.googleLogin, idToken)
      .pipe(tap((res) => this.handleLoginResponse(res)));
  }
  refreshToken(refreshToken: string): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    environment.endpoints.auth.refreshToken;
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: { accessToken: string; refreshToken: string };
      }>(environment.endpoints.auth.refreshToken, refreshToken)
      .pipe(tap((res) => this.handleLoginResponse(res)));
  }

  logout(): Observable<{ success: boolean; message: string; data: null }> {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http
      .post<{ success: boolean; message: string; data: null }>(
        environment.endpoints.auth.logout,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .pipe(tap(() => this.clearTokens()));
  }
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isAuthenticatedSubject.next(false);
  }
}
