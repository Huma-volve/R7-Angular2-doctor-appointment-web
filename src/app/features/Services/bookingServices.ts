import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
