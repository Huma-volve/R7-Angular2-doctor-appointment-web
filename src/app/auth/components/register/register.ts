import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.router.navigate(['/auth/login']);
    console.log('Form submitted:', form.value);
  }
}
