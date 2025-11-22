import { iTopRatedDoctors } from './../interfaces/itop-rated-doctors';
import { Home } from './../Services/home';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/service/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, AuthRoutingModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  doctors = signal<iTopRatedDoctors[]>([]);
  private readonly _Home = inject(Home);
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
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3 },
    },
  };
  GetTopRatedDoctors(): void {
    this._Home.getTopRate().subscribe({
      next: (res) => {
        this.doctors.set(res.data);
      },
    });
  }
  ngOnInit(): void {
    this.GetTopRatedDoctors();
  }
}
