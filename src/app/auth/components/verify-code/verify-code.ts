import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-code',
  standalone: false,
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode {
  verify: boolean = false;
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
}
