import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  endpoint ='http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  // LISTAR órdenes
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint);
  }

  // OBTENER una orden por ID
  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }

  // CREAR orden
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.endpoint, order);
  }

  // ACTUALIZAR orden
  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${id}`, order);
  }

  // ELIMINAR orden
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  
}
