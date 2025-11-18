import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Reviews {
  private http = inject(HttpClient);
  getAllReviews(): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(environment.endpoints.Reviews.getReviews);
  }
  getReviewByDoctor(doctorId: number): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: any;
    }>(environment.endpoints.Reviews.getReviewsByDoctorId(doctorId));
  }
  addReview(review: {
    doctorId: number;
    rating: number;
    comment: string;
    createAt: string;
  }): Observable<{
    success: boolean;
    message: string;
    data: any;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: any;
    }>(environment.endpoints.Reviews.addReviw, review);
  }
}
