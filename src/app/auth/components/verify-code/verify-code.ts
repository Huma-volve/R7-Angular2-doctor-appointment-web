import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: false,
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode {
  private router = inject(Router);
  verify: boolean = false;
  changeBtnVerifyTrabslatY: boolean = false;
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.verify = true;
    console.log('Form submitted:', form.value);
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
