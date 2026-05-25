import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../../core/models/budget.model';

@Injectable({ providedIn: 'root' })
export class CategorylistService {
  private baseUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategoryList(userId: string): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.baseUrl}?userId=${userId}`);
  }

  updateCategory(categoryId: string, updatedCategory: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.baseUrl}/${categoryId}`, updatedCategory);
  }
}
