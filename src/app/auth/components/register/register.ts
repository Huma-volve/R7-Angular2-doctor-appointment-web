import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }

    this.authService
      .register(form.value as Register)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.router.navigate([`/auth/verifyRegister/${form.value.phoneNumber}`]);
        },
      });
  }
}
