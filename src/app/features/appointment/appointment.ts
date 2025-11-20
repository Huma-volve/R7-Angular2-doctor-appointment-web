import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrettyDatePipe } from '../../shared/pipe/pretty-date-pipe';
import { DoctorDetails } from '../interfaces/doctor-details';
import { Doctors } from '../Services/doctors';
import { RatingStars } from '../rating-stars/rating-stars';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Reviews } from '../Services/reviews';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-appointment',
  imports: [RouterLink, PrettyDatePipe, RatingStars, FormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss',
})
export class Appointment implements OnInit {
  rating: number = 0;
  comment: string = '';

  constructor(private route: ActivatedRoute) {}

  private readonly doctorService = inject(Doctors);
  private destroyRef = inject(DestroyRef);
  private reviewService = inject(Reviews);

  doctorDetails = signal<DoctorDetails | null>(null);

  today = new Date();
  days: any[] = [];

  changeBg(selectedDiv: HTMLDivElement, otherDiv1?: HTMLDivElement, otherDiv2?: HTMLDivElement) {
    selectedDiv.style.backgroundColor = '#edf7ee';
    selectedDiv.style.borderRadius = '10px';
    if (otherDiv1) otherDiv1.style.backgroundColor = 'white';
    if (otherDiv2) otherDiv2.style.backgroundColor = 'white';
  }
  book() {}
  addReview() {
    const createAt = new Date().toISOString();

    this.reviewService
      .addReview({
        rating: this.rating,
        doctorId: 2,
        comment: this.comment,
        createAt,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('Review Added:', res);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
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
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const doctorId = +idParam;
        this.loadDoctorDetails(doctorId);
      }
    });
    this.generateDays();
    this.reviewService
      .getAllReviews()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log(res);
      });
    this.reviewService
      .getReviewByDoctor(4)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log(res);
      });
  }

  baseUrl = environment.apiBaseUrl;
}
