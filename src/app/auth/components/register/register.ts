import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }

    this.authService.register(form.value as Register).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.router.navigate([`/auth/verify/${form.value.phoneNumber}`]);
      },
    });
  }
}
