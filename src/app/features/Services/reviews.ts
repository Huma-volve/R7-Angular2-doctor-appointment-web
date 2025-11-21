import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../core/environment/environment';
import { AddReview } from '../interfaces/add-review';
import { GetAllReviews } from '../interfaces/get-all-reviews';

@Injectable({
  providedIn: 'root',
})
export class Reviews {
  private http = inject(HttpClient);
  getAllReviews(): Observable<{
    success: boolean;
    message: string;
    data: GetAllReviews[];
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: GetAllReviews[];
    }>(environment.endpoints.Reviews.getReviews);
  }
  getReviewByDoctor(doctorId: number): Observable<{
    success: boolean;
    message: string;
    data: GetAllReviews[];
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: GetAllReviews[];
    }>(environment.endpoints.Reviews.getReviewsByDoctorId(doctorId));
  }
  addReview(review: AddReview): Observable<{
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
