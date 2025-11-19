import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink  } from '@angular/router';
import { Doctor } from '../interfaces/doctor';
import { Doctors } from '../Services/doctors';
import { specialties } from '../interfaces/specialties';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink ],
  templateUrl: './doctors-list.html',
  styleUrls: ['./doctors-list.scss'],
})
export class DoctorsList {

@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
  }


// _____________________________________________

  private readonly doctorService = inject(Doctors);


  constructor(private router: Router) { }

  currentPage = signal(1);
  pageSize = 9;
  totalDoctors = 0;
  pagedDoctors = signal<Doctor[]>([]);

  isSidebarCollapsed: boolean = true;

  allDoctors = signal<Doctor[]>([])
  specialties = signal<specialties[]>([])
  searchDoctors = signal('');
  sortFilter: string = '';
  selectedSpecialties: number[] = [];

  onSearch(term: string) {
    if (term.trim() === '') {
      this.loadDoctors();
      return;
    }
  this.searchDoctors.set(term);

  const body = {
    keyword: term || null,
    specialityId: null,
    gender: null,
    sortBy: null,
    pageNumber: 1,
    pageSize: 10
  };

  this.search(body);
}


  sortOptions = [
    { label: 'Most recommended', value: 'recommended' },
    { label: 'Price Low to High', value: 'priceLowToHigh' },
    { label: 'Price High to Low', value: 'priceHighToLow' },
  ];

  applyFilters(): void {
    let tempDoctors = [...this.allDoctors()];

    // Sort Filter
    switch (this.sortFilter) {
      case 'priceLowToHigh':
        tempDoctors.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        tempDoctors.sort((a, b) => b.price - a.price);
        break;
      case 'recommended':
      default:
        tempDoctors.sort((a, b) => b.rating - a.rating);
        break;
    }

    this.allDoctors.set(tempDoctors);
    this.currentPage.set(1);
    this.applyPagination();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


  toggleSpecialty(id: number): void {
    const index = this.selectedSpecialties.indexOf(id);
    if (this.selectedSpecialties[0] === id) {
    this.selectedSpecialties = [];
  } else {
    this.selectedSpecialties = [id];
    }
    // this.applyFilters();
  if (this.selectedSpecialties.length > 0) {
    this.getDoctorsBySpecialty(this.selectedSpecialties[0]);
  } else {
    this.loadDoctors();
  }

  }

  isSpecialtySelected(id: number): boolean {
    return this.selectedSpecialties.includes(id);
  }

  private loadDoctors(): void {
  this.doctorService.getAllDoctors().subscribe({
    next: (response) => {
      this.allDoctors.set(response.data);
      this.totalDoctors = response.data.length;
      this.applyPagination();
    },
  });
  }

applyPagination() {
  const all = this.allDoctors();
  if (this.currentPage() === 1) {
    this.pagedDoctors.set(all.slice(0, 9));
  } else {
    this.pagedDoctors.set(all.slice(9));
  }
}

nextPage() {
  if (this.currentPage() === 1) {
    this.currentPage.set(2);
    this.applyPagination();
  }
}

prevPage() {
  if (this.currentPage() === 2) {
    this.currentPage.set(1);
    this.applyPagination();
  }
  }

    private loadSpecialties(): void {
      this.doctorService.getAllSpecialties().subscribe({
      next: (response) => {
        this.specialties.set(response.data);
          console.log(this.specialties);
      },
    });
  }

  getDoctorsBySpecialty(id: number): void {
  this.doctorService.getDoctorsBySpecialty(id).subscribe({
    next: (response) => {
      this.allDoctors.set(response.data);
      this.currentPage.set(1);
      this.applyPagination();
      },
  });
  }

  private search(body: any): void {
  this.doctorService.searchDoctors(body).subscribe({
    next: (response) => {
      this.allDoctors.set(response.data.doctors);
      this.currentPage.set(1);
      this.applyPagination();
    },
  });
}

  bookAppointment(doctorId: number): void {
    this.router.navigate(['/layout/appointment', doctorId]);
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
  }
}
