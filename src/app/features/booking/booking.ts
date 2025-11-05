import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, AuthRoutingModule, RouterLink, RouterOutlet],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  selectedDate: string = '';
}
