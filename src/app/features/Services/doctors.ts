import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { map, Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor';
import { specialists } from '../interfaces/specialists';
import { DoctorDetails } from '../interfaces/doctor-details';

@Injectable({
  providedIn: 'root'
})

export class Doctors {

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor | any> {
    return this.http.get<Doctor>(`${environment.endpoints.doctors.getAll}`)
  }
  getAllSpecialists(): Observable<specialists | any> {
    return this.http.get<specialists>(`${environment.endpoints.specialists.getAllSpecialists}`)
  }
  getDoctorDetails(id: number) {
  return this.http.get<{ success: boolean, message: string, data: DoctorDetails }>(
    `${environment.endpoints.doctors.getDetails(id)}`
  ).pipe(
    map((response: { data: any; }) => response.data) // هنا ناخد الـ data بس
  );
}

}





