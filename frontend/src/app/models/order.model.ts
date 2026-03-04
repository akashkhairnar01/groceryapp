export interface OrderItem {
  itemId: number;
  qty: number;
}

export interface Order {
  id: number;
  createdAt: string;
  total: number;
  paymentMethod: string;
  status: string;
}

export interface DashboardStats {
  revenue: number;
  orderCount: number;
  lowStockCount: number;
}
