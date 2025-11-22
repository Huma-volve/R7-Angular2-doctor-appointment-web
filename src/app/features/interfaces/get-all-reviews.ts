export interface GetAllReviews {
  comment: string;
  createdAt: string;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}
