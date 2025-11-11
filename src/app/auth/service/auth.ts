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
    data: null;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.verifyRegister, body);
  }

  verifyLogin(body: VerifyNumber): Observable<{
    success: boolean;
    message: string;
    data: null;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: null;
    }>(environment.endpoints.auth.verifyRegister, body);
  }
}
