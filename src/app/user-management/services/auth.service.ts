import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl = "http://localhost:3000";
  constructor(private http:HttpClient) { }

  registerUser(postData:RegisterPostData): Observable<any>{
    return this.http.post(`${this.baseurl}/users`,postData).pipe(
      switchMap((newUser: any) => {
        const profileData = {
          userId: newUser.id, // User's ID from response
          uname: postData.uname, 
          email: postData.email, 
          profilePicture: "/images/default-profile.png", // Default profile picture
          incomeSource: ["Employer","Online Store","Stock Market","Apartment Rent","Upwork","Gifts"], // Empty array for now, can be updated later
          incomeCategories: ["Salary", "Freelancing"], // Default categories
          expenseCategories: ["Food", "Rent", "Transport"], 
          budgetSettings: {
            monthlyLimit: 1000, // Default budget limit
          }
        };
      
        return this.http.post(`${this.baseurl}/profiles`, profileData);  // Return a new observable
      })                                                                                                         
    );
  }
  getUserDetails(email:string,password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseurl}/users?email=${email}&password=${password}`);
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('email') !== null; // If email exists, user is logged in
  }
}
