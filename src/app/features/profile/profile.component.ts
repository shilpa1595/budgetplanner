import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './profile.service';
import { Profile } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  userId: string | null = null;

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (this.userId) this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile(this.userId!).subscribe({
      next: response => {
        if (response.length > 0) this.profile = response[0];
      },
      error: err => console.error('Error fetching profile:', err)
    });
  }

  /** Returns initials from the username for the avatar fallback. */
  get initials(): string {
    if (!this.profile?.uname) return '?';
    return this.profile.uname
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
