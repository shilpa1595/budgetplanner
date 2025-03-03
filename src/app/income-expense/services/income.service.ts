import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Income } from '../interfaces/income';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  addIncome(income:Income):Observable<Income>{
      return this.http.post<Income>(`${this.apiUrl}/income`,income);
    }
  getIncomes(email:string):Observable<Income[]>{
    return this.http.get<Income[]>(`${this.apiUrl}/income?userEmail=${email}`);
  }
  getIncomeById(id:string):Observable<Income>{
    return this.http.get<Income>(`${this.apiUrl}/income/${id}`);
  }
  updateIncome(id: string, income: Income): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/income/${id}`, income);
  }
  deleteIncome(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/income/${id}`)
  }
}
