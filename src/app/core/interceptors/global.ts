import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { catchError, finalize, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/service/auth';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const spinner = inject(NgxSpinnerService);
  const authService = inject(AuthService);

  spinner.show();

  let accessToken = '';
  let refreshToken = '';

  if (isPlatformBrowser(platformId)) {
    accessToken = localStorage.getItem('accessToken') || '';
    refreshToken = localStorage.getItem('refreshToken') || '';
  }

  const sendRequest = (token: string) => {
    const clonedReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return next(clonedReq).pipe(finalize(() => spinner.hide()));
  };

  return sendRequest(accessToken).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && refreshToken) {
        return authService.refreshToken(refreshToken).pipe(
          switchMap((res) => {
            if (res.success && res.data) {
              if (isPlatformBrowser(platformId)) {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
              }
              return sendRequest(res.data.accessToken);
            } else {
              authService.clearTokens();
              return throwError(() => new Error('Session expired.'));
            }
          }),
          catchError((err) => {
            authService.clearTokens();
            return from(authService.logout()).pipe(switchMap(() => throwError(() => err)));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
