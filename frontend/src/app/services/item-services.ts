import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServices {
  private baseUrl = 'http://localhost:8080/api/items'; // tu endpoint real

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, item);
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
