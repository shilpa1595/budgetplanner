import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../core/models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly apiUrl = 'http://localhost:3000/expense';

  constructor(private http: HttpClient) {}

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  getExpenses(userEmail: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?userEmail=${userEmail}`);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }
}
