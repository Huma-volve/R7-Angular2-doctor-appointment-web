import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { environment } from '../../core/environment/environment';
import { AppointmentsData } from '../interfaces/YourAppointments';
import { YourAppointments } from '../Services/your-appointments';
import { bookingServices } from '../Services/bookingServices';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  private readonly _YourAppointments = inject(YourAppointments);
  private readonly _bookingServices = inject(bookingServices);
  private readonly _ToastrService = inject(ToastrService);
  private readonly router = inject(Router);

  selectedDate = signal<string>(new Date().toISOString().substring(0, 10));
  selectedTab = signal<'AllBooking' | 'upcoming' | 'completed' | 'Cancelled'>('AllBooking');
  appointments = signal<AppointmentsData[]>([]);
  BaseUrl = environment.apiBaseUrl;
  filteredAppointments = computed(() => {
    const tab = this.selectedTab();
    const all = this.appointments();

    switch (tab) {
      case 'upcoming':
        return all.filter((a) => a.status === 'Upcoming');

      case 'completed':
        return all.filter((a) => a.status === 'Completed');

      case 'Cancelled':
        return all.filter((a) => a.status === 'Cancelled');

      default:
        return all;
    }
  });

  getPatientBookings(): void {
    this._YourAppointments.PatientBookings().subscribe({
      next: (res: any) => {
        console.log(res);
        this.appointments.set(res.data.data);
      },
    });
  }

  getButtons(status: string) {
    switch (status) {
      case 'Upcoming':
        return [
          { text: 'Cancel', class: 'btn-second', action: 'cancel' },
          { text: 'Reschedule', class: 'btn-main', action: 'reschedule' },
        ];

      case 'Completed':
        return [
          { text: 'Book again', class: 'btn-main', action: 'bookAgain' },
          { text: 'Feedback', class: 'btn-second', action: 'feedback' },
        ];

      case 'Cancelled':
        return [
          { text: 'Book again', class: 'btn-main', action: 'bookAgain' },
          { text: 'Support', class: 'btn-second', action: 'support' },
        ];

      default:
        return [];
    }
  }

  handleButtonClick(action: string, item: AppointmentsData) {
    switch (action) {
      case 'Cancelled':
        this._bookingServices.CancelBooking(item.id).subscribe({
          next: (res) => {
            this._ToastrService.success(res.message, 'success');
            this.getPatientBookings();
          },
        });
        break;

      case 'reschedule':
        console.log('Reschedule clicked for:', item);
        this._bookingServices.RescheduleBooking(item.id, this.selectedDate()).subscribe({
          next: (res) => {
            this._ToastrService.success(res.message, 'success');
            this.getPatientBookings();
          },
        });
        break;

      case 'bookAgain':
        this.router.navigate(['/layout/appointment', item.doctorId]);
        break;

      case 'feedback':
        this.router.navigate(['/layout/appointment', item.doctorId]);
        break;

      case 'support':
        this.router.navigate(['/layout/appointment', item.doctorId]);
        break;
    }
  }
  setTab(tab: 'AllBooking' | 'upcoming' | 'completed' | 'Cancelled') {
    this.selectedTab.set(tab);
  }
  ngOnInit(): void {
    this.getPatientBookings();
  }
}
