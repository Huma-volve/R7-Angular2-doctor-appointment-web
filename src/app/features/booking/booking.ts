import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { environment } from '../../core/environment/environment';
import { AppointmentsData } from '../interfaces/YourAppointments';
import { YourAppointments } from '../Services/your-appointments';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  private readonly _YourAppointments = inject(YourAppointments);
  selectedDate = signal<string>(new Date().toISOString().substring(0, 10));
  selectedTab = signal<'AllBooking' | 'upcoming' | 'completed' | 'canceled'>('AllBooking');
  appointments = signal<AppointmentsData[]>([]);
  filteredAppointments = computed(() => {
    const tab = this.selectedTab();
    const all = this.appointments();

    switch (tab) {
      case 'upcoming':
        return all.filter(
          (a) => a.status === 'Upcoming' && a.appointmentAt.substring(0, 10) === this.selectedDate()
        );

      case 'completed':
        return all.filter(
          (a) =>
            a.status === 'Completed' && a.appointmentAt.substring(0, 10) === this.selectedDate()
        );

      case 'canceled':
        return all.filter(
          (a) => a.status === 'Canceled' && a.appointmentAt.substring(0, 10) === this.selectedDate()
        );

      default:
        return all;
    }
  });

  BaseUrl = environment.apiBaseUrl;

  ngOnInit(): void {
    this.getPatientBookings();
  }

  getPatientBookings(): void {
    this._YourAppointments.PatientBookings().subscribe({
      next: (res: any) => {
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

      case 'Canceled':
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
      case 'cancel':
        console.log('Cancel clicked for:', item);
        break;

      case 'reschedule':
        console.log('Reschedule clicked for:', item);
        break;

      case 'bookAgain':
        console.log('Book again clicked for:', item);
        break;

      case 'feedback':
        console.log('Feedback clicked for:', item);
        break;

      case 'support':
        console.log('Support clicked for:', item);
        break;
    }
  }
  setTab(tab: 'AllBooking' | 'upcoming' | 'completed' | 'canceled') {
    this.selectedTab.set(tab);
  }
}
