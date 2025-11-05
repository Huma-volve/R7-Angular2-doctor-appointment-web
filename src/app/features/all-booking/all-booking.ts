import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-booking',
  imports: [CommonModule],
  templateUrl: './all-booking.html',
  styleUrl: './all-booking.scss',
})
export class AllBooking {
  appointments = [
    {
      date: 'Monday, July 21 - 11:00 AM',
      status: 'Upcoming',
      statusClass: 'text-primary',
      doctorName: 'Jennifer Miller',
      specialty: 'Psychiatrist',
      address: '129, El-Nasr Street, Cairo, Egypt',
      img: '../../../assets/images/doctor-1.svg',
      actions: [
        { text: 'Cancel', outline: true },
        { text: 'Reschedule', outline: false },
      ],
    },
    {
      date: 'Monday, July 21 - 11:00 AM',
      status: 'Completed',
      statusClass: 'text-success',
      doctorName: 'Jennifer Miller',
      specialty: 'Psychiatrist',
      address: '129, El-Nasr Street, Cairo, Egypt',
      img: '../../../assets/images/doctor-2.svg',
      actions: [
        { text: 'Book again', outline: true },
        { text: 'Feedback', outline: false },
      ],
    },
    {
      date: 'Monday, July 21 - 11:00 AM',
      status: 'Canceled',
      statusClass: 'text-danger',
      doctorName: 'Jennifer Miller',
      specialty: 'Psychiatrist',
      address: '129, El-Nasr Street, Cairo, Egypt',
      img: '../../../assets/images/doctor-3.svg',
      actions: [
        { text: 'Book again', outline: true },
        { text: 'Support', outline: false },
      ],
    },
    {
      date: 'Monday, July 21 - 11:00 AM',
      status: 'Completed',
      statusClass: 'text-success',
      doctorName: 'Jennifer Miller',
      specialty: 'Psychiatrist',
      address: '129, El-Nasr Street, Cairo, Egypt',
      img: '../../../assets/images/doctor-4.svg',
      actions: [
        { text: 'View details', outline: true },
        { text: 'Feedback', outline: false },
      ],
    },
  ];
}
