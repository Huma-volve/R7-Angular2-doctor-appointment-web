import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  selector: 'app-map',
  imports: [RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {

  doctors: Doctor[] = [
    { id: 1, name: 'Robert Johnson', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.8, availableTime: '9:30am - 8:00pm', price: 350, gender: 'Male', image: 'assets/images/doctor-1.svg'},
    { id: 2, name: 'Alice Smith', specialty: 'Cardiologist', hospital: 'City General', rating: 4.9, availableTime: '10:00am - 7:00pm', price: 400, gender: 'Female', image: 'assets/images/doctor-2.svg'},
    { id: 3, name: 'Emily White', specialty: 'Pediatrician', hospital: "Children's Hospital", rating: 4.7, availableTime: '8:00am - 5:00pm', price: 300, gender: 'Female', image: 'assets/images/doctor-3.svg'},
    { id: 4, name: 'Michael Brown', specialty: 'Dentist', hospital: 'Dental Clinic', rating: 4.5, availableTime: '9:00am - 6:00pm', price: 250, gender: 'Male', image: 'assets/images/doctor-4.svg'},
    { id: 5, name: 'Sarah Davis', specialty: 'Neurologist', hospital: 'St. Jude Medical', rating: 4.9, availableTime: '11:00am - 8:00pm', price: 450, gender: 'Female', image: 'assets/images/doctor-5.svg'},
    { id: 6, name: 'David Lee', specialty: 'Orthopedic', hospital: 'El-Nasr Hospital', rating: 4.6, availableTime: '9:00am - 7:00pm', price: 370, gender: 'Male', image: 'assets/images/doctor-6.svg'},
    { id: 7, name: 'Jessica Chen', specialty: 'Cardiologist', hospital: 'Heart Institute', rating: 4.8, availableTime: '8:30am - 5:30pm', price: 420, gender: 'Female', image: 'assets/images/doctor-7.svg'},
    { id: 8, name: 'Kevin Wang', specialty: 'Dentist', hospital: 'Happy Teeth Clinic', rating: 4.7, availableTime: '10:00am - 7:00pm', price: 280, gender: 'Male', image: 'assets/images/doctor-8.svg'},
    { id: 9, name: 'Olivia Kim', specialty: 'Pulmonologist', hospital: 'Lung Health Center', rating: 4.9, availableTime: '9:00am - 6:00pm', price: 380, gender: 'Female', image: 'assets/images/doctor-9.svg'}
  ];



}
