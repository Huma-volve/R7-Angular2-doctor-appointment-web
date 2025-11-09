import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink  } from '@angular/router';


interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  availableTime: string;
  price: number;
  gender: 'Male' | 'Female';
  image: string;
}

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './doctors-list.html',
  styleUrls: ['./doctors-list.scss'],
})
export class DoctorsList implements OnInit {

  isSidebarCollapsed: boolean = true;


  availableDateFilter: 'Today' | 'Tomorrow' | null = null;
  genderFilter: 'Male' | 'Female' | null = null;
  consultationTypeFilter: 'In-clinic' | 'Home Visit' | null = null;
  sortFilter: 'recommended' | 'priceLowToHigh' | 'priceHighToLow' = 'recommended';
  searchText: string = '';
  selectedSpecialties: string[] = [];


  allDoctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];


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

  ngOnInit(): void {
    this.allDoctors = this.getMockDoctors();
    this.applyFilters();
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


  applyFilters(): void {
    let tempDoctors = [...this.allDoctors];

    // Search Text Filter
    if (this.searchText) {
      const lowerCaseSearch = this.searchText.toLowerCase();
      tempDoctors = tempDoctors.filter(doc =>
        doc.name.toLowerCase().includes(lowerCaseSearch) ||
        doc.specialty.toLowerCase().includes(lowerCaseSearch) ||
        doc.hospital.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Specialty Filter
    if (this.selectedSpecialties.length > 0) {
      tempDoctors = tempDoctors.filter(doc =>
        this.selectedSpecialties.includes(doc.specialty)
      );
    }

    // Gender Filter
    if (this.genderFilter) {
      tempDoctors = tempDoctors.filter(doc => doc.gender === this.genderFilter);
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
        tempDoctors.sort((a, b) => b.rating - a.rating); // Higher rating first
        break;
    }

    this.filteredDoctors = tempDoctors;
  }

  // Doctors Information
  private getMockDoctors(): Doctor[] {
    return [
      { id: 1, name: 'Robert Johnson', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.8, availableTime: '9:30am - 8:00pm', price: 350, gender: 'Male', image: 'assets/images/doctor-1.svg' },
      { id: 2, name: 'Alice Smith', specialty: 'Cardiologist', hospital: 'City General', rating: 4.9, availableTime: '10:00am - 7:00pm', price: 400, gender: 'Female', image: 'assets/images/doctor-2.svg' },
      { id: 3, name: 'Emily White', specialty: 'Pediatrician', hospital: 'Children\'s Hospital', rating: 4.7, availableTime: '8:00am - 5:00pm', price: 300, gender: 'Female', image: 'assets/images/doctor-3.svg' },
      { id: 4, name: 'Michael Brown', specialty: 'Dentist', hospital: 'Dental Clinic', rating: 4.5, availableTime: '9:00am - 6:00pm', price: 250, gender: 'Male', image: 'assets/images/doctor-4.svg' },
      { id: 5, name: 'Sarah Davis', specialty: 'Neurologist', hospital: 'St. Jude Medical', rating: 4.9, availableTime: '11:00am - 8:00pm', price: 450, gender: 'Female', image: 'assets/images/doctor-5.svg' },
      { id: 6, name: 'David Lee', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.6, availableTime: '9:00am - 7:00pm', price: 370, gender: 'Male', image: 'assets/images/doctor-6.svg' },
      { id: 7, name: 'Jessica Chen', specialty: 'Cardiologist', hospital: 'Heart Institute', rating: 4.8, availableTime: '8:30am - 5:30pm', price: 420, gender: 'Female', image: 'assets/images/doctor-7.svg' },
      { id: 8, name: 'Kevin Wang', specialty: 'Dentist', hospital: 'Happy Teeth Clinic', rating: 4.7, availableTime: '10:00am - 7:00pm', price: 280, gender: 'Male', image: 'assets/images/doctor-8.svg' },
      { id: 9, name: 'Olivia Kim', specialty: 'Pulmonologist', hospital: 'Lung Health Center', rating: 4.9, availableTime: '9:00am - 6:00pm', price: 380, gender: 'Female', image: 'assets/images/doctor-9.svg' }
    ];
  }

  constructor(private router: Router) { }

  bookAppointment(doctorId: number): void {
    this.router.navigate(['/layout/appointment', doctorId]);
  }

}
