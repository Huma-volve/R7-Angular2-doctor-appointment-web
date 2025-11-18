import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { BehaviorSubject, from, Observable, of, switchMap, tap } from 'rxjs';
import { Register } from '../components/register/register';
import { VerifyNumber } from '../model/verify-number';
import { jwtDecode } from 'jwt-decode';
declare const google: any;
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
      const userDetails = jwtDecode(res.data.accessToken);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
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
    }>(environment.endpoints.auth.resendOtp, { phoneNumber });
  }
  refresh() {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    return this.http
      .post<{
        success: boolean;
        data: { accessToken: string; refreshToken: string };
        message: string;
      }>(environment.endpoints.auth.refreshToken, { refreshToken })
      .pipe(
        tap((res) => {
          if (res.success) {
            this.saveTokens(res.data.accessToken, res.data.refreshToken);
          }
        }),
        switchMap((res) => of(res.data))
      );
  }
  refreshToken(refreshToken: string): Observable<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: { accessToken: string; refreshToken: string };
      }>(environment.endpoints.auth.refreshToken, { refreshToken })
      .pipe(tap((res) => this.handleLoginResponse(res)));
  }

  logout(): Observable<{ success: boolean; message: string; data: null }> {
    const refreshToken = localStorage.getItem('refreshToken') || 'acb.ssj.sko';
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
    localStorage.removeItem('userDetails');
    this.isAuthenticatedSubject.next(false);
  }

  sendGoogleTokenToBackend(idToken: string): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        data: null;
      }>(environment.endpoints.auth.googleLogin, { idToken })
      .pipe(tap((res) => console.log('Backend response:', res)));
  }

  loadGoogleScript(): Observable<void> {
    if (typeof window === 'undefined') return of(); // SSR STOP

    return new Observable((observer) => {
      if (document.getElementById('google-script')) {
        observer.next();
        observer.complete();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        observer.next();
        observer.complete();
      };
      script.onerror = () => observer.error('Google script failed to load');

      document.body.appendChild(script);
    });
  }

  initGoogleLogin(buttonElementId: string): Observable<string> {
    return this.loadGoogleScript().pipe(
      switchMap(() => {
        return new Observable<string>((observer) => {
          if (typeof google === 'undefined') {
            observer.error('Google is undefined');
            return;
          }

          google.accounts.id.initialize({
            client_id: '974678887899-qe6sjnel0u95gbcb9kprm3j4jjuclrpq.apps.googleusercontent.com',
            callback: (response: any) => {
              observer.next(response.credential);
              observer.complete();
            },
            use_fedcm_for_prompt: false,
          });

          const btn = document.getElementById(buttonElementId);
          if (btn) {
            google.accounts.id.renderButton(btn, {
              theme: 'outline',
              size: 'large',
              width: '100%',
            });
          }
        });
      })
    );
  }
}
