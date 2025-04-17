
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { OrdersList, OrderType } from './orders/OrdersList';
import { OrderDetailSheet } from './orders/OrderDetailSheet';
import { OrderStatus } from './orders/OrderStatusBadge';

// Demo data for orders
const DEMO_ORDERS = [
  { 
    id: "ORD-1234",
    table: "Mesa 4",
    customerName: "Juan Pérez",
    timestamp: "19:35",
    status: "pending" as OrderStatus, 
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
    status: "cooking" as OrderStatus, 
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
    status: "ready" as OrderStatus, 
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
    status: "delivered" as OrderStatus, 
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
    status: "delivered" as OrderStatus, 
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

export const RestaurantOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>(DEMO_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const handleViewOrder = (order: OrderType) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs 
          value={selectedStatus} 
          onValueChange={setSelectedStatus} 
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="cooking">En cocina</TabsTrigger>
            <TabsTrigger value="ready">Listos</TabsTrigger>
            <TabsTrigger value="delivered">Entregados</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar pedidos..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <OrdersList 
        orders={orders}
        filteredOrders={filteredOrders}
        onViewOrder={handleViewOrder}
        onUpdateStatus={handleUpdateStatus}
      />
      
      <OrderDetailSheet
        open={orderDetailsOpen}
        onOpenChange={setOrderDetailsOpen}
        selectedOrder={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </motion.div>
  );
};
