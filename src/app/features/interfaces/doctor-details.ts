import { AvailableSlots } from './available-slots';
import { GetAllReviews } from './get-all-reviews';

export interface DoctorDetails {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  about: string;
  rating: number;
  pricePerHour: number;
  experienceYears: number;
  imgUrl: string;
  reviewsCount: number;
  specialities: [string];
  licenses: [];
  latitude: number;
  langtude: number;
  bookingCount: number;
  availableSlots: AvailableSlots[];
  reviews: GetAllReviews[];
}
