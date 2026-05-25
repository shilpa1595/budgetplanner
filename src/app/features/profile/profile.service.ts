import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../core/models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly baseUrl = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}?userId=${userId}`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/${profile.id}`, profile);
  }
}
