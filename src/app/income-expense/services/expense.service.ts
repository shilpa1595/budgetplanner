import { Injectable } from '@angular/core';
import { Expense } from '../interfaces/expense';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:3000/expense'; 
  // Add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
  // Fetch all expenses
  getExpenses(userEmail: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?userEmail=${userEmail}`);
  }

  deleteExpense(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateExpense(expense:Expense):Observable<Expense[]>{
    return this.http.put<Expense[]>(`${this.apiUrl}/${expense.id}`,expense);
  }
}
