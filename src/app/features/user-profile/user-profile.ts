import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../Services/profileService';
import { environment } from '../../core/environment/environment';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  private readonly profileService = inject(ProfileService);

  activeItem: string = 'personal';

  profile = signal<Profile | null>(null);
  updateProfile = signal<any>(null);
  hasProfileData = true;
  profileForm!: FormGroup;
  baseUrl = environment.apiBaseUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  private loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {

        // this.hasProfileData = false;
        if (response?.data) {
          this.profileForm.patchValue(response?.data)
        }

    },
  });
}

  saveChanges() {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: (response) => {
        console.log("Updated successfully", response);
        this.updateProfile.set(null);
      },
      error: (err) => {
        console.log("Update Error:", err);

        if (err.error?.errors) {
          this.updateProfile.set(err.error.errors);
        }
        this.profileForm.reset();
      }
    });

    console.log('Form submitted successfully');
    console.log(this.profileForm.value);
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  createProfile() {
    this.hasProfileData = false;
    this.profileForm.reset();
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['',Validators.required,],
      email: ['', Validators.required],

      birthdayDay: ['29', Validators.required],
      birthdayMonth: ['July', Validators.required],
      birthdayYear: ['2009', Validators.required],

      location: ['', Validators.required],
    });

    this.loadProfile();
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }

}
