import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  toggle: boolean = false;
  changeToggle() {
    this.toggle = !this.toggle;
  }
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.router.navigate(['auth/login']);
      },
    });
  }
}
