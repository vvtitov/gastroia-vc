
import { OrderStatus } from "@/components/restaurant/orders/OrderStatusBadge";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderType {
  id: string;
  table: string;
  customerName: string;
  timestamp: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
}
