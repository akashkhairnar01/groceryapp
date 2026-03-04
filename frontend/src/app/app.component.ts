import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerStoreComponent } from './components/customer-store/customer-store.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomerStoreComponent, AdminDashboardComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  activeTab: 'customer' | 'admin' = 'customer';
}
