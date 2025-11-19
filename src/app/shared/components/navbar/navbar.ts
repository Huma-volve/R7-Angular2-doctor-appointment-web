import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctors } from '../../../features/Services/doctors';
import { IUserDetails } from '../../../features/interfaces/iuser-details';
import { environment } from '../../../core/environment/environment';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SlicePipe, FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly doctorService = inject(Doctors);
  private router = inject(Router);
  data = signal<IUserDetails | null>(null);
  filtered = signal<any[]>([]);
  toggle: boolean = false;
  baseUrl = environment.apiBaseUrl;

  changeToggle() {
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('userDetails');
    if (saved) {
      this.data.set(JSON.parse(saved) as IUserDetails);
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
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
