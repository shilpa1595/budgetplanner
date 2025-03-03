import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:3000/profiles';

  constructor(private http:HttpClient) { }

   // Fetch the user's profile based on the userId
   getProfile(userId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}?userId=${userId}`);
  }

  updateProfile(profile: any):Observable<Profile>{
    return this.http.put<Profile>(`${this.baseUrl}/${profile.id}`,profile)
  }
}
