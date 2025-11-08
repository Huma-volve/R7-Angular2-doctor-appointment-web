import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  submit(form: any) {
    form.control.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this.router.navigate(['/auth/verify']);
    console.log('Form submitted:', form.value);
  }
}
