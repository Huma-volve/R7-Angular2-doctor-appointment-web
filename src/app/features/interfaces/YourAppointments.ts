export interface Appointments {
  success: boolean;
  message: string;
  data: AppointmentsPagenaitin;
}

export interface AppointmentsPagenaitin {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: AppointmentsData[];
}

export interface AppointmentsData {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorSpeciality: string;
  doctorImg: string;
  patientId: number;
  patientName: string;
  payment: string;
  status: string;
  paymentUrl: string;
  appointmentAt: string;
}


