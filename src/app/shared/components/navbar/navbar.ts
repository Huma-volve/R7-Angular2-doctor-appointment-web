import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctors } from '../../../features/Services/doctors';
import { IUserDetails } from '../../../features/interfaces/iuser-details';
import { environment } from '../../../core/environment/environment';
import { AuthService } from '../../../auth/service/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { Notifications } from '../../services/notifications';
import { INotification } from '../../interfaces/notification';
import { TimeAgoPipe } from '../../../features/pipe/time-ago-pipe';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SlicePipe, FormsModule, CommonModule, TimeAgoPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly doctorService = inject(Doctors);
  private readonly notificationService = inject(Notifications);
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  data = signal<IUserDetails | null>(null);
  notifications = signal<INotification[]>([]);
  notificationsIsread = signal<INotification[]>([]);
  filtered = signal<any[]>([]);
  toggle: boolean = false;
  toggleNotification: boolean = false;
  baseUrl = environment.apiBaseUrl;

  changeToggle() {
    this.toggle = !this.toggle;
  }
  changeToggleNotification() {
    this.toggleNotification = !this.toggleNotification;
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('userDetails');
    if (saved) {
      this.data.set(JSON.parse(saved) as IUserDetails);
    }
    this.notificationService
      .getNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.notifications.set(res.data);
          this.notifications().reverse();
          this.notificationsIsread.set(res.data.filter((n) => n.isRead === false));
        },
      });
  }
  makeReadNotification() {
    for (let n of this.notificationsIsread()) {
      this.notificationService
        .markAsRead(n.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.notificationsIsread.set(
              this.notificationsIsread().filter((notif) => notif.id !== n.id)
            );
          },
        });
    }
  }
  onSearch(doctorName: string): void {
    const body = {
      keyword: doctorName,
      specialityId: null,
      gender: null,
      sortBy: null,
      pageNumber: 1,
      pageSize: 10,
    };

    this.doctorService.searchDoctors(body).subscribe({
      next: (response) => {
        this.filtered.set(response.data.doctors);
      },
    });
  }
  closeSearch(searchInput?: HTMLInputElement) {
    this.filtered.set([]);
    if (searchInput) searchInput.value = '';
  }

  logout() {
    this.authService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toaster.success(res.message);
        this.router.navigate(['/auth/login']);
      });
  }
}
