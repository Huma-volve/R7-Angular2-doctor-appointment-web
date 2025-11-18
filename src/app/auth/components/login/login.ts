import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  ngOnInit(): void {
    this.authService.initGoogleLogin('googleBtn').subscribe({
      next: (idToken) => {
        console.log('Google idToken:', idToken);

        this.authService.sendGoogleTokenToBackend(idToken).subscribe({
          next: (data) => {
            console.log('LOGIN OK:', data);
          },
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });
  }

  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.authService
      .login(form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.router.navigate([`/auth/verify/${form.value.phoneNumber}`]);
        },
      });
  }

  googleLogin() {
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.prompt();
    }
  }
}
