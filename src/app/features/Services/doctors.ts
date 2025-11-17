import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { map, Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor';
import { specialties } from '../interfaces/specialties';
import { DoctorDetails } from '../interfaces/doctor-details';

@Injectable({
  providedIn: 'root'
})

export class Doctors {

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor | any> {
    return this.http.get<Doctor>(`${environment.endpoints.doctors.getAll}`)
  }

  getDoctorDetails(id: number) {
  return this.http.get<{ success: boolean, message: string, data: DoctorDetails }>(
    `${environment.endpoints.doctors.getDetails(id)}`
  ).pipe(
    map((response: { data: any; }) => response.data)
  );
  }

  getAllSpecialties(): Observable<specialties | any> {
    return this.http.get<specialties>(`${environment.endpoints.specialists.getAllSpecialists}`)
  }

  getDoctorsBySpecialty(id: number): Observable<Doctor | any> {
    return this.http.get<Doctor>(`${environment.endpoints.specialists.getAllDoctorsSpecialists}/${id}`)
  }

  searchDoctors(body: any): Observable<any> {
    return this.http.post(`${environment.endpoints.search.searchDoctors}`, body);
  }

}





