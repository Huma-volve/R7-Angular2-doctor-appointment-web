import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../core/environment/environment';
import { CreateBooking } from '../interfaces/create-booking';

@Injectable({
  providedIn: 'root',
})
export class bookingServices {
  private readonly _HttpClient = inject(HttpClient);

  CancelBooking(id: number | any): Observable<any> {
    return this._HttpClient.put(`api/Customer/Booking/CancelBooking/${id}`, {});
  }
  RescheduleBooking(id: number, newDate: string): Observable<any> {
    return this._HttpClient.put(
      `api/Customer/Booking/RescheduleBooking/${id}`,
      JSON.stringify(newDate),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  createBooking(bookingData: CreateBooking): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this._HttpClient.post<{
      success: boolean;
      message: string;
      data: any;
    }>(`${environment.endpoints.booking.createBooking}`, bookingData);
  }
  getPaypalSuccess(token: string): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this._HttpClient.get<{
      success: boolean;
      message: string;
      data: any;
    }>(`${environment.endpoints.booking.paypaSuccess}?token=${token}`);
  }
  getStripeSuccess(sessionId: string): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this._HttpClient.get<{
      success: boolean;
      message: string;
      data: any;
    }>(`${environment.endpoints.booking.stripeSuccess}?session_id=${sessionId}`);
  }
}
