import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { VerifyNumber } from '../../model/verify-number';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-code',
  standalone: false,
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode implements OnInit {
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
    const otpNumber = form.value;
    this.authService
      .verifyRegister({ phoneNumber: this.phoneNumber, otpNumber: form.value } as VerifyNumber)
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
        },
      });
    this.verify = true;
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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/verify']);
    });
  }
  goToSginIn() {
    this.router.navigate(['/auth/login']);
  }
}
