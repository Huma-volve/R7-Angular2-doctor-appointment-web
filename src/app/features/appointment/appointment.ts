import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrettyDatePipe } from '../../shared/pipe/pretty-date-pipe';
import { DoctorDetails } from '../interfaces/doctor-details';
import { Doctors } from '../Services/doctors';
import { RatingStars } from '../rating-stars/rating-stars';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Reviews } from '../Services/reviews';
import { environment } from '../../core/environment/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TimeAgoPipe } from '../pipe/time-ago-pipe';
import { bookingServices } from '../Services/bookingServices';
import { AvailableSlots } from '../interfaces/available-slots';
import { GetAllReviews } from '../interfaces/get-all-reviews';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-appointment',
  imports: [
    RouterLink,
    PrettyDatePipe,
    RatingStars,
    FormsModule,
    CurrencyPipe,
    CommonModule,
    TimeAgoPipe,
  ],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss',
})
export class Appointment implements OnInit {
  rating: number = 0;
  comment: string = '';
  payment: 0 | 1 | 2 = 0;
  selectedSlotId: number | null = null;
  dateTime: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedSlot: boolean = false;
  private readonly doctorService = inject(Doctors);
  private bookingService = inject(bookingServices);
  private destroyRef = inject(DestroyRef);
  private reviewService = inject(Reviews);
  private toaster = inject(ToastrService);
  private router = inject(Router);
  private doctorId: number = 0;
  doctorDetails = signal<DoctorDetails | null>(null);
  reviewsByDoctor = signal<GetAllReviews[] | []>([]);
  today = new Date();
  days: any[] = [];
  constructor(private route: ActivatedRoute) {}
  changeBg(selectedDiv: HTMLDivElement, otherDiv1?: HTMLDivElement, otherDiv2?: HTMLDivElement) {
    selectedDiv.style.backgroundColor = '#edf7ee';
    selectedDiv.style.borderRadius = '10px';
    if (otherDiv1) otherDiv1.style.backgroundColor = 'white';
    if (otherDiv2) otherDiv2.style.backgroundColor = 'white';
  }
  selectSlot(availableSlote: AvailableSlots) {
    this.selectedSlot = !this.selectedSlot;
    if (this.selectedSlot) {
      this.selectedSlotId = availableSlote.id;
      this.dateTime = availableSlote.dateTime;
      this.startTime = availableSlote.startTime;
      this.endTime = availableSlote.endTime;
    }
  }
  book() {
    if (!this.selectedSlotId) {
      this.toaster.error('Please select a time slot');
      return;
    }

    const payload = {
      doctorId: this.doctorId,
      slotId: this.selectedSlotId,
      amount: this.doctorDetails()?.pricePerHour ?? 0,
      payment: this.payment,
      status: 1,
      appointmentAt: new Date().toISOString(),
    };

    this.bookingService
      .createBooking(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.data.payment === 'Cach') {
            const modal = new bootstrap.Modal('#paymentSuccessModal');
            modal.show();
            setTimeout(() => {
              this.router.navigate(['/layout/booking']);
            }, 2000);
          }
          if (res.data.paymentUrl) {
            const url = res.data.paymentUrl as string;
            const screenW = window.screen.availWidth || window.screen.width;
            const screenH = window.screen.availHeight || window.screen.height;
            const w = Math.floor(screenW * 0.5);
            const h = Math.floor(screenH * 0.5);
            const left = Math.floor((screenW - w) / 2);
            const top = Math.floor((screenH - h) / 2);
            const features = `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`;
            const newWin = window.open(url, '_blank', features);
            if (newWin) newWin.focus();
            if (res.data.paymentUrl.includes('paypal')) {
              const token = res.data.paymentUrl.split('token=')[1];
              this.bookingService
                .getPaypalSuccess(token)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((res) => {
                  const modal = new bootstrap.Modal('#paymentSuccessModal');
                  modal.show();
                  setTimeout(() => {
                    this.router.navigate(['/layout/booking']);
                  }, 2000);
                });
              if (res.data.paymentUrl.includes('stripe')) {
                const sessionId = res.data.paymentUrl.split('session_id=')[1];
                this.bookingService
                  .getStripeSuccess(sessionId)
                  .pipe(takeUntilDestroyed(this.destroyRef))
                  .subscribe((res) => {
                    const modal = new bootstrap.Modal('#paymentSuccessModal');
                    modal.show();
                    setTimeout(() => {
                      this.router.navigate(['/layout/booking']);
                    }, 2000);
                  });
              }
            }
          }

          this.toaster.success(res.message);
        },
      });
  }
  addReview() {
    const createAt = new Date().toISOString();

    this.reviewService
      .addReview({
        rating: this.rating,
        doctorId: this.doctorId,
        comment: this.comment,
        createAt: new Date().toISOString(),
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.toaster.success(res.message);
          this.router.navigate(['/layout/home']);
        },
      });
  }

  done() {
    this.router.navigate(['/layout/booking']);
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
        full: date,
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
    const availableSlots = this.doctorDetails()?.availableSlots || [];
    const dateDay = availableSlots.filter((slot) => slot.dateTime === day.full.toISOString());
    console.log(dateDay);
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
        console.log(this.doctorDetails());
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorDetails(this.doctorId);
      }
    });
    this.generateDays();
    // this.reviewService
    //   .getAllReviews()
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.reviewService
      .getReviewByDoctor(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.reviewsByDoctor.set(res.data);
      });
  }

  baseUrl = environment.apiBaseUrl;
}
