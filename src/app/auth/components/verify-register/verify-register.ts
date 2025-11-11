import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';
import { VerifyNumber } from '../../model/verify-number';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-verify-register',
  standalone: false,
  templateUrl: './verify-register.html',
  styleUrl: './verify-register.scss',
})
export class VerifyRegister implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  verify: boolean = false;
  phoneNumber: string = '';
  changeBtnVerifyTrabslatY: boolean = false;
  ngOnInit() {
    this.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber') || '';
  }
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    const otpNumber = `${form.value.number1}${form.value.number2}${form.value.number3}${form.value.number4}`;

    this.authService
      .verifyRegister({ phoneNumber: this.phoneNumber, otpNumber } as VerifyNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            this.router.navigate(['/home']);
            this.toastr.success(res.message);
          } else {
            this.verify = true;
          }
        },
        error: (err) => {
          this.verify = true;
        },
      });
  }
  moveToNext(event: Event, nextInput?: HTMLInputElement) {
    const input = event.target as HTMLInputElement | null;
    if (input && input.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  moveToPrev(event: KeyboardEvent, prevInput?: HTMLInputElement) {
    const input = event.target as HTMLInputElement | null;
    if (input && input.value === '' && event.key === 'Backspace' && prevInput) {
      prevInput.focus();
    }
  }
  changeTranslateY() {
    this.changeBtnVerifyTrabslatY = true;
  }
  resendCode() {
    this.authService.resendOtp(this.phoneNumber).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/auth/verify']);
          });
        } else {
          this.toastr.error(res.message);
        }
      },
    });
  }
  goToSginIn() {
    this.router.navigate(['/auth/login']);
  }
}
