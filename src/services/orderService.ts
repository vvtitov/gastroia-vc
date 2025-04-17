
import { OrderType } from "@/types/orders";
import { OrderStatus } from "@/components/restaurant/orders/OrderStatusBadge";

// Demo data for orders
export const DEMO_ORDERS: OrderType[] = [
  { 
    id: "ORD-1234",
    table: "Mesa 4",
    customerName: "Juan Pérez",
    timestamp: "19:35",
    status: "pending", 
    items: [
      { name: "Milanesa napolitana", quantity: 1, price: 2650 },
      { name: "Papas fritas", quantity: 1, price: 850 },
      { name: "Coca-Cola", quantity: 1, price: 750 }
    ],
    total: 4250,
    paymentMethod: "pending"
  },
  { 
    id: "ORD-1235",
    table: "Mesa 1",
    customerName: "María González",
    timestamp: "19:15",
    status: "cooking", 
    items: [
      { name: "Pasta bolognesa", quantity: 2, price: 2200 },
      { name: "Ensalada mixta", quantity: 1, price: 950 },
      { name: "Agua mineral", quantity: 2, price: 550 }
    ],
    total: 6450,
    paymentMethod: "pending"
  },
  { 
    id: "ORD-1236",
    table: "Barra 2",
    customerName: "Carlos López",
    timestamp: "19:25",
    status: "ready", 
    items: [
      { name: "Hamburguesa completa", quantity: 1, price: 2400 },
      { name: "Cerveza artesanal", quantity: 1, price: 950 }
    ],
    total: 3350,
    paymentMethod: "pending"
  },
  { 
    id: "ORD-1237",
    table: "Mesa 6",
    customerName: "Laura Martínez",
    timestamp: "18:55",
    status: "delivered", 
    items: [
      { name: "Pizza grande", quantity: 1, price: 3200 },
      { name: "Cerveza", quantity: 3, price: 850 },
      { name: "Tiramisu", quantity: 2, price: 950 }
    ],
    total: 7650,
    paymentMethod: "cash"
  },
  { 
    id: "ORD-1238",
    table: "Mesa 3",
    customerName: "Roberto Fernández",
    timestamp: "19:05",
    status: "delivered", 
    items: [
      { name: "Bife de chorizo", quantity: 1, price: 3500 },
      { name: "Puré de papas", quantity: 1, price: 750 },
      { name: "Vino Malbec", quantity: 1, price: 2200 },
      { name: "Flan con dulce", quantity: 1, price: 800 }
    ],
    total: 7250,
    paymentMethod: "card"
  }
];

// Helper function to get filtered orders based on status
export const getFilteredOrders = (orders: OrderType[], status: string): OrderType[] => {
  return status === 'all' ? orders : orders.filter(order => order.status === status);
};
