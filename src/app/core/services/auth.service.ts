import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { RegisterPostData, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData): Observable<any> {
    return this.http.post(`${this.baseurl}/users`, postData).pipe(
      switchMap((newUser: any) => {
        const userId = newUser.id;

        const profileData = {
          userId,
          uname: postData.uname,
          email: postData.email,
          profilePicture: 'assets/images/default-profile.png',
          incomeSource: ['Employer', 'Online Store', 'Stock Market', 'Apartment Rent', 'Upwork', 'Gifts'],
          incomeCategories: ['Salary', 'Freelancing'],
          expenseCategories: ['Food', 'Rent', 'Transport'],
          budgetSettings: { monthlyLimit: 1000 }
        };

        return this.http.post(`${this.baseurl}/profiles`, profileData).pipe(
          map(() => userId)
        );
      }),
      switchMap((userId: string) => {
        const categories = {
          userId,
          email: postData.email,
          income: ['Salary', 'Freelancing', 'Rental', 'Awards', 'Lottery', 'Bussiness', 'Coupons', 'Gifts'],
          expense: ['Clothing', 'Education', 'Entertainment', 'Food', 'Health', 'Home', 'Shopping', 'Sport', 'Transportation', 'Beauty', 'TelePhone']
        };
        return this.http.post(`${this.baseurl}/categories`, categories);
      })
    );
  }

  getUserDetails(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}/users?email=${email}&password=${password}`);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('email') !== null;
  }

  logout(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
  }
}
