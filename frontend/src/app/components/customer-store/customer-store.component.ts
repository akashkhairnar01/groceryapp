import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-customer-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-store.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(8px)' }),
          stagger(60, [animate('260ms ease-out', style({ opacity: 1, transform: 'none' }))])
        ], { optional: true })
      ])
    ])
  ]
})
export class CustomerStoreComponent implements OnInit {
  items: Item[] = [];
  cart: { itemId: number; name: string; qty: number; price: number }[] = [];
  paymentMethod = 'COD';
  qtyByItem: Record<number, number> = {};
  message = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void {
    this.api.getItems().subscribe(items => {
      this.items = items;
      this.qtyByItem = items.reduce((acc, item) => ({ ...acc, [item.id!]: 1 }), {});
    });
  }

  addToCart(item: Item): void {
    if (!item.id) return;

    const qty = Number(this.qtyByItem[item.id] ?? 1);
    if (!Number.isInteger(qty) || qty < 1) {
      this.message = `Invalid quantity for ${item.name}.`;
      return;
    }

    const existing = this.cart.find(c => c.itemId === item.id);
    const nextQty = (existing?.qty ?? 0) + qty;

    if (nextQty > item.stock) {
      this.message = `Only ${item.stock} units available for ${item.name}.`;
      return;
    }

    this.message = '';
    if (existing) {
      existing.qty = nextQty;
    } else {
      this.cart.push({ itemId: item.id, name: item.name, qty, price: item.price });
    }
  }

  decrease(itemId: number): void {
    const line = this.cart.find(c => c.itemId === itemId);
    if (!line) return;
    line.qty -= 1;
    if (line.qty <= 0) {
      this.cart = this.cart.filter(c => c.itemId !== itemId);
    }
  }

  placeOrder(): void {
    if (!this.cart.length) {
      this.message = 'Add at least one item before checkout.';
      return;
    }

    this.api.checkout(this.cart.map(c => ({ itemId: c.itemId, qty: c.qty })), this.paymentMethod)
      .subscribe({
        next: () => {
          this.cart = [];
          this.loadItems();
          this.message = '✅ Order placed successfully.';
        },
        error: err => {
          this.message = err?.error?.message ?? 'Unable to place order.';
        }
      });
  }

  total(): number {
    return this.cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
  }
}
