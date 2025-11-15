import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../interfaces/YourAppointments';

@Injectable({
  providedIn: 'root',
})
export class YourAppointments {
  private readonly _HttpClient = inject(HttpClient);

  PatientBookings(): Observable<Appointments> {
    return this._HttpClient.get<Appointments>('api/Customer/Booking/PatientBookings');
  }
}
