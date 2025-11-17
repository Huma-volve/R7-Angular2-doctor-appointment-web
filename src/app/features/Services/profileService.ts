import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../interfaces/profile";
import { environment } from "../../core/environment/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile | any> {
    return this.http.get<Profile>(`${environment.endpoints.profile.getProfile}`);
  }

  updateProfile(data: any) {
    return this.http.put<any>(`${environment.endpoints.profile.updateProfile}`, data);
  }


}
