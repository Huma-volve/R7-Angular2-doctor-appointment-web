import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

  activeItem: string = 'personal';

  setActive(item: string) {
    this.activeItem = item;
  }
  logout() {
    this.router.navigate(['/login']);
  }

  hasProfileData = true;
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required,
        Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)]],
      email: ['', [Validators.required, Validators.email]],

      birthdayDay: ['29', Validators.required],
      birthdayMonth: ['July', Validators.required],
      birthdayYear: ['2002', Validators.required],

      location: ['', Validators.required]
    });
  }

  saveChanges() {

    if (this.profileForm.valid) {
      console.log(this.profileForm);

      console.log('Form Submitted!', this.profileForm.value);
      this.profileForm.reset();
    } else {
      console.log('Form is invalid');
      this.profileForm.markAllAsTouched();
    }

  }

  createProfile() {
    this.hasProfileData = false;
    this.profileForm.reset();
  }
}
