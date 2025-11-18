import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../environment/environment';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../auth/service/auth';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const spinner = inject(NgxSpinnerService);
  const authService = inject(AuthService);

  let accessToken = '';
  if (isPlatformBrowser(platformId)) {
    accessToken = localStorage.getItem('accessToken') || '';
  }

  spinner.show();

  const excludedUrls = [
    'https://accounts.google.com',
    'https://oauth2.googleapis.com',
    'https://www.googleapis.com',
  ];
  if (excludedUrls.some((url) => req.url.startsWith(url))) {
    return next(req).pipe(finalize(() => spinner.hide()));
  }

  const modifiedReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401(modifiedReq, next, authService);
      }
      return throwError(() => error);
    }),
    finalize(() => spinner.hide())
  );
};

function handle401(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshSubject.next(null);

    return authService.refresh().pipe(
      switchMap((tokens) => {
        isRefreshing = false;
        refreshSubject.next(tokens.accessToken);

        const newReq = request.clone({
          setHeaders: { Authorization: `Bearer ${tokens.accessToken}` },
        });

        return next(newReq);
      }),
      catchError((err) => {
        isRefreshing = false;
        const refreshToken = localStorage.getItem('refreshToken');
        if (request.url.includes('/refresh') || !refreshToken) {
          authService.clearTokens();
        }

        return throwError(() => err);
      })
    );
  }

  return refreshSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((token) =>
      next(
        request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      )
    )
  );
}
