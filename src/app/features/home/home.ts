import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
type Doctor = {
  name: string;
  specialty: string;
  hospital: string;
  price: number;
  img: string;
  rating: number;
  time: string;
};

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  doctors: Doctor[] = [
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      price: 350,
      img: '../../../assets/images/DOCTOR.jpg',
      rating: 4.8,
      time: '9:30am - 8:00pm',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      price: 350,
      img: '../../../assets/images/DOCTOR.jpg',
      rating: 4.8,
      time: '9:30am - 8:00pm',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      price: 350,
      img: '../../../assets/images/DOCTOR.jpg',
      rating: 4.8,
      time: '9:30am - 8:00pm',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      price: 350,
      img: '../../../assets/images/DOCTOR.jpg',
      rating: 4.8,
      time: '9:30am - 8:00pm',
    },
  ];

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 16,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplaySpeed: 400,
    autoplayHoverPause: true,
    autoHeight: false,
    responsive: {
      0: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };
}
