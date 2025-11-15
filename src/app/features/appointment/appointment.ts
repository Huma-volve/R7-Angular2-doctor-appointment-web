import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrettyDatePipe } from '../../shared/pipe/pretty-date-pipe';
import { DoctorDetails } from '../interfaces/doctor-details';
import { Doctors } from '../Services/doctors';


@Component({
  selector: 'app-appointment',
  imports: [RouterLink, PrettyDatePipe ],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss',
})

export class Appointment {

  constructor(private route: ActivatedRoute) {}

  private readonly doctorService = inject(Doctors);

  doctorDetails = signal<DoctorDetails | null>(null);

  today = new Date();
  days: any[] = [];
      showPaymentModel: boolean = false;
      showReviewModal: boolean = false;

      changeBg(selectedDiv: HTMLDivElement, otherDiv1 ?: HTMLDivElement, otherDiv2 ?: HTMLDivElement) {
        selectedDiv.style.backgroundColor = '#edf7ee';
        selectedDiv.style.borderRadius = '10px';
        if (otherDiv1) otherDiv1.style.backgroundColor = 'white';
        if (otherDiv2) otherDiv2.style.backgroundColor = 'white';
      }
      book() {
        this.showPaymentModel = true;
      }
      addReview() {
        this.showReviewModal = true;
      }

      // days = [
      //   { name: 'Fri', date: 12 },
      //   { name: 'Sat', date: 13 },
      //   { name: 'Sun', date: 14 },
      //   { name: 'Mon', date: 15 },
      //   { name: 'Tue', date: 16 },
      //   { name: 'Wed', date: 17 },
      //   { name: 'Thu', date: 18 },
      // ];

      generateDays() {
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      this.days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        number: date.getDate(),
        full: date
      });
    }
  }

  times = [
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:30 PM',
        '5:30 PM',
        '7:00 PM',
        '9:00 PM',
        '10:00 PM',
  ];

  selectedDay: any = null;
  selectedTime: string | null = null;

  selectDay(day: any) {
  this.selectedDay = day;
  this.selectedTime = null;
  }

  selectTime(time: string) {
  this.selectedTime = time;
  }

  private loadDoctorDetails(id: number): void {
    this.doctorService.getDoctorDetails(id).subscribe({
      next: (response) => {
        this.doctorDetails.set(response);
      },
    });
  }

      ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const doctorId = +idParam;
        this.loadDoctorDetails(doctorId);
      }
    });
        this.generateDays();
  }

}
