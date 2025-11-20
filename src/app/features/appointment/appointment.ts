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
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-appointment',
  imports: [RouterLink, PrettyDatePipe, RatingStars, FormsModule, DatePipe],
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
  currentMonth: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  selectedDay: any = null;
  selectedTime: string | null = null;

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

  generateDays() {
    this.days = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      this.days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        number: i,
        full: date
      });
    }
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateDays();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateDays();
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
    this.generateDays();
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

}
