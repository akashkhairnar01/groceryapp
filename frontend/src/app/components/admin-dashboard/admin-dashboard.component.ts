import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DashboardStats, Order } from '../../models/order.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  stats?: DashboardStats;
  orders: Order[] = [];
  items: Item[] = [];
  form: Item = { name: '', category: '', price: 0, stock: 0 };

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.api.getDashboard().subscribe(s => this.stats = s);
    this.api.getOrders().subscribe(o => this.orders = o);
    this.api.getAdminItems().subscribe(i => this.items = i);
  }

  saveItem(): void {
    const action = this.form.id ? this.api.updateItem(this.form) : this.api.createItem(this.form);
    action.subscribe(() => {
      this.form = { name: '', category: '', price: 0, stock: 0 };
      this.refresh();
    });
  }

  edit(item: Item): void { this.form = { ...item }; }

  remove(itemId?: number): void {
    if (!itemId) return;
    this.api.deleteItem(itemId).subscribe(() => this.refresh());
  }
}
