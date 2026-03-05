import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomerStoreComponent } from './components/customer-store/customer-store.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerStoreComponent, AdminDashboardComponent],
  templateUrl: './app.component.html',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('280ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  activeTab: 'customer' | 'admin' = 'customer';
  isLoggedIn = false;

  credentials = {
    username: '',
    password: '',
    role: 'customer' as 'customer' | 'admin'
  };

  errorMessage = '';

  login(): void {
    const { username, password, role } = this.credentials;
    const trimmedUser = username.trim().toLowerCase();
    const validCustomer = role === 'customer' && trimmedUser === 'customer' && password === 'customer123';
    const validAdmin = role === 'admin' && trimmedUser === 'admin' && password === 'admin123';

    if (!validCustomer && !validAdmin) {
      this.errorMessage = 'Invalid credentials. Try customer/customer123 or admin/admin123.';
      return;
    }

    this.activeTab = role;
    this.isLoggedIn = true;
    this.errorMessage = '';
  }

  logout(): void {
    this.isLoggedIn = false;
    this.credentials = { username: '', password: '', role: 'customer' };
  }
}
