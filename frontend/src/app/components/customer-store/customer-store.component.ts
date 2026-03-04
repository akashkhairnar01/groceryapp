import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-customer-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-store.component.html'
})
export class CustomerStoreComponent implements OnInit {
  items: Item[] = [];
  cart: { itemId: number; name: string; qty: number; price: number }[] = [];
  paymentMethod = 'COD';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void { this.api.getItems().subscribe(items => this.items = items); }

  addToCart(item: Item): void {
    const existing = this.cart.find(c => c.itemId === item.id);
    if (existing) {
      if (existing.qty + 1 > item.stock) return;
      existing.qty += 1;
      return;
    }
    this.cart.push({ itemId: item.id!, name: item.name, qty: 1, price: item.price });
  }

  placeOrder(): void {
    if (!this.cart.length) return;
    this.api.checkout(this.cart.map(c => ({ itemId: c.itemId, qty: c.qty })), this.paymentMethod)
      .subscribe(() => {
        this.cart = [];
        this.loadItems();
        alert('Order placed successfully');
      });
  }

  total(): number {
    return this.cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
  }
}
