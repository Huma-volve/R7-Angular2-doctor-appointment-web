import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink  } from '@angular/router';
import { Doctor } from '../interfaces/doctor';
import { Doctors } from '../Services/doctors';

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

  sortFilter: string = '';
  searchText: string = '';
  selectedSpecialties: string[] = [];

  specialties = [
    { name: 'Dentist', icon: 'fa-tooth' },
    { name: 'Cardiologist', icon: 'fa-heartbeat' },
    { name: 'ENT', icon: 'fa-ear-listen' },
    { name: 'Neurologist', icon: 'fa-brain' },
    { name: 'General Practitioner', icon: 'fa-user-md' },
    { name: 'Ophthalmologist', icon: 'fa-eye' },
    { name: 'Pulmonologist', icon: 'fa-lungs' }

  ];

  sortOptions = [
    { label: 'Most recommended', value: 'recommended' },
    { label: 'Price Low to High', value: 'priceLowToHigh' },
    { label: 'Price High to Low', value: 'priceHighToLow' },
  ];

  applyFilters(): void {
    let tempDoctors = [...this.allDoctors()];

    // Search Text Filter
    if (this.searchText) {
      const lowerCaseSearch = this.searchText.toLowerCase();
      tempDoctors = tempDoctors.filter(doc =>
        doc.fullName.toLowerCase().includes(lowerCaseSearch) ||
        doc.specialistTitle.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Specialty Filter
    if (this.selectedSpecialties.length > 0) {
      tempDoctors = tempDoctors.filter(doc =>
        this.selectedSpecialties.includes(doc.specialistTitle)
      );
    }

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


  toggleSpecialty(specialtyName: string): void {
    const index = this.selectedSpecialties.indexOf(specialtyName);
    if (index > -1) {
      this.selectedSpecialties.splice(index, 1);
    } else {
      this.selectedSpecialties.push(specialtyName);
    }
    this.applyFilters();
  }

  isSpecialtySelected(specialtyName: string): boolean {
    return this.selectedSpecialties.includes(specialtyName);
  }

    private loadDoctors(): void {
      this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.allDoctors.set(response.data);
          console.log(this.allDoctors);
      },
    });
  }

  bookAppointment(doctorId: number): void {
    this.router.navigate(['/layout/appointment', doctorId]);
  }

  ngOnInit(): void {
    this.loadDoctors();
  }
}
