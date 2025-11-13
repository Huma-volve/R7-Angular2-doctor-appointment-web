import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Home {
  private readonly _HttpClient = inject(HttpClient);
  getTopRate(): Observable<any> {
    return this._HttpClient.get('api/Customer/Doctors/GetTopRatedDoctors');
  }
}
