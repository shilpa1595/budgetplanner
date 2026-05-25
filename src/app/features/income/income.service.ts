import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../../core/models/income.model';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(`${this.apiUrl}/income`, income);
  }

  getIncomes(email: string): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/income?userEmail=${email}`);
  }

  getIncomeById(id: string): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/income/${id}`);
  }

  updateIncome(id: string, income: Income): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/income/${id}`, income);
  }

  deleteIncome(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/income/${id}`);
  }
}
