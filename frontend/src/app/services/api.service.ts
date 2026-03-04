import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { DashboardStats, Order, OrderItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> { return this.http.get<Item[]>(`${this.base}/items`); }
  checkout(items: OrderItem[], paymentMethod: string): Observable<Order> {
    return this.http.post<Order>(`${this.base}/checkout`, { items, paymentMethod });
  }

  getAdminItems(): Observable<Item[]> { return this.http.get<Item[]>(`${this.base}/admin/items`); }
  createItem(item: Item): Observable<Item> { return this.http.post<Item>(`${this.base}/admin/items`, item); }
  updateItem(item: Item): Observable<Item> { return this.http.put<Item>(`${this.base}/admin/items/${item.id}`, item); }
  deleteItem(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/admin/items/${id}`); }

  getOrders(): Observable<Order[]> { return this.http.get<Order[]>(`${this.base}/admin/orders`); }
  getDashboard(): Observable<DashboardStats> { return this.http.get<DashboardStats>(`${this.base}/admin/dashboard`); }
}
