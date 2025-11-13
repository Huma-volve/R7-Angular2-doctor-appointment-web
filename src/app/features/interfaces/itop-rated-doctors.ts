export interface iTopRatedDoctors {
  id: number;
  fullName: string;
  about: string;
  imgUrl: string;
  specialityId: number;
  specialistTitle: string;
  address: string;
  rating: number;
  distance: null;
  isFavourite: boolean;
  price: number;
  startDate: null | string;
  endDate: null | string;
}
