import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  message = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.api.getDashboard().subscribe(s => this.stats = s);
    this.api.getOrders().subscribe(o => this.orders = o);
    this.api.getAdminItems().subscribe(i => this.items = i);
  }

  saveItem(formRef: NgForm): void {
    if (formRef.invalid) {
      this.message = 'Please provide valid name, category, price, and stock.';
      return;
    }

    const action = this.form.id ? this.api.updateItem(this.form) : this.api.createItem(this.form);
    action.subscribe({
      next: () => {
        this.form = { name: '', category: '', price: 0, stock: 0 };
        formRef.resetForm(this.form);
        this.message = '✅ Inventory saved successfully.';
        this.refresh();
      },
      error: err => {
        this.message = err?.error?.message ?? 'Unable to save item.';
      }
    });
  }

  edit(item: Item): void {
    this.form = { ...item };
    this.message = '';
  }

  remove(itemId?: number): void {
    if (!itemId) return;
    this.api.deleteItem(itemId).subscribe({
      next: () => {
        this.message = '✅ Item removed.';
        this.refresh();
      },
      error: err => {
        this.message = err?.error?.message ?? 'Unable to delete item.';
      }
    });
  }
}
