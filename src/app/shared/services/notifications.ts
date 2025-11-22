import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../core/environment/environment';
import { INotification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  private readonly http = inject(HttpClient);
  getNotifications(): Observable<{ success: boolean; message: string; data: INotification[] }> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      environment.endpoints.Notifications.getByUser
    );
  }
  markAsRead(id: number): Observable<{ success: boolean; message: string; data: any }> {
    return this.http.put<{ success: boolean; message: string; data: any }>(
      environment.endpoints.Notifications.markRead(id),
      {}
    );
  }
}
