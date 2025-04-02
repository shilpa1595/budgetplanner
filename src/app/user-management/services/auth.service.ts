import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl = "http://localhost:3000";
  constructor(private http:HttpClient) { }

  registerUser(postData:RegisterPostData): Observable<any>{
    return this.http.post(`${this.baseurl}/users`,postData).pipe(
      switchMap((newUser: any) => {

        const userId = newUser.id; // Store userId from first response

        const profileData = {
          userId: userId, // User's ID from response
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
      
        return this.http.post(`${this.baseurl}/profiles`, profileData).pipe(
          map(() => userId) // Pass userId to the next step
        );  // Return a new observable
      }),                                                                                                         
   
      switchMap((userId: string) => {
        const categories = {
          userId: userId, // User's ID from response
          email: postData.email, 
          income: ["Salary", "Freelancing","Rental","Awards","Lottery","Bussiness","Coupons","Gifts"], // Default categories
          expense: ["Clothing", "Education", "Entertainment","Food","Health","Home","Shopping","Sport","Transportation","Beauty","TelePhone"], 
        };
      
        return this.http.post(`${this.baseurl}/categories`, categories);  // Return a new observable
      })                                                                                                         
  
    )}
  getUserDetails(email:string,password:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseurl}/users?email=${email}&password=${password}`);
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('email') !== null; // If email exists, user is logged in
  }
}
