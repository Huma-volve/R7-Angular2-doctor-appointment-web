import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
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
  private readonly doctorService = inject(Doctors);


  constructor(private router: Router) { }

  isSidebarCollapsed: boolean = true;

  allDoctors = signal<Doctor[]>([])
  specialties = signal<specialties[]>([])
  specialtyDoctors = signal<Doctor[]>([]);
  searchDoctors = signal('');

  onSearch(term: string) {
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

  sortFilter: string = '';
  selectedSpecialties: number[] = [];

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

    this.allDoctors.set(tempDoctors) ;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


  toggleSpecialty(id: number): void {
    const index = this.selectedSpecialties.indexOf(id);
    if (index > -1) {
      this.selectedSpecialties.splice(index, 1);
    } else {
      this.selectedSpecialties.push(id);
    }
    this.applyFilters();
  }

  isSpecialtySelected(id: number): boolean {
    return this.selectedSpecialties.includes(id);
  }

    private loadDoctors(): void {
      this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.allDoctors.set(response.data);
          console.log(this.allDoctors);
      },
      });

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
      this.specialtyDoctors.set(response.data);
      console.log("Doctors in this specialty:", this.specialtyDoctors());
    },
  });
  }

  private search(body: any): void {
  this.doctorService.searchDoctors(body).subscribe({
    next: (response) => {
      this.allDoctors.set(response.data.doctors);
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
