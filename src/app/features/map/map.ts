import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctors } from '../Services/doctors';
import { Doctor } from '../interfaces/doctor';


@Component({
  selector: 'app-map',
  imports: [RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {

  private readonly doctorService = inject(Doctors);

  allDoctors = signal<Doctor[]>([])

  private loadDoctors(): void {
      this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.allDoctors.set(response.data);
          console.log(this.allDoctors);
      },
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }


}
