import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../budget/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategorylistService {
  private baseUrl = 'http://localhost:3000/categories';

  constructor(private http:HttpClient) { }

  getCategoryList(userId: string):Observable<Categories>{
    return this.http.get<Categories>(`${this.baseUrl}?userId=${userId}`);
  }
  // Update a specific category in JSON Server
  updateCategory(categoryId: string, updatedCategory: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${categoryId}`, updatedCategory);
  }
}
