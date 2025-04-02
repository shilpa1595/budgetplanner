import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../budget/interfaces/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:3000/budget';

  constructor(private http:HttpClient) { }

  setExpenseBudget(budget:Budget):Observable<Budget>{
    return this.http.post<Budget>(`${this.baseUrl}`,budget);
  }
  getBudgetList():Observable<Budget[]>{
    return this.http.get<Budget[]>(`${this.baseUrl}`);
  }
}
