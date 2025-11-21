export interface CreateBooking {
  doctorId: number;
  slotId: number;
  amount: number;
  payment: 0 | 1 | 2;
  status: number;
  appointmentAt: string;
}
