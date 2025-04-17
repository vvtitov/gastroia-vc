
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  CookingPot, 
  AlertTriangle, 
  Printer, 
  ChevronsRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Demo data for orders
const DEMO_ORDERS = [
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

// Order status configuration
const ORDER_STATUS = {
  pending: { 
    label: 'Pendiente', 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: <Clock className="h-4 w-4 mr-1" />
  },
  cooking: { 
    label: 'En cocina', 
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    icon: <CookingPot className="h-4 w-4 mr-1" />
  },
  ready: { 
    label: 'Listo para servir', 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: <AlertTriangle className="h-4 w-4 mr-1" />
  },
  delivered: { 
    label: 'Entregado', 
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: <CheckCircle className="h-4 w-4 mr-1" />
  }
};

export const RestaurantOrders: React.FC = () => {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };
  
  return (
    <div className="space-y-4">
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
      
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Pedidos activos</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Mesa</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No hay pedidos con el estado seleccionado
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell>{order.timestamp}</TableCell>
                    <TableCell>
                      <Badge className={ORDER_STATUS[order.status].color}>
                        <span className="flex items-center">
                          {ORDER_STATUS[order.status].icon}
                          {ORDER_STATUS[order.status].label}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>${order.total.toLocaleString('es-AR')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                        
                        {order.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateStatus(order.id, 'cooking')}
                            className="h-8 w-8 p-0"
                          >
                            <CookingPot className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {order.status === "cooking" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateStatus(order.id, 'ready')}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {order.status === "ready" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateStatus(order.id, 'delivered')}
                            className="h-8 w-8 p-0"
                          >
                            <ChevronsRight className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Order Details Sheet */}
      <Sheet open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Pedido {selectedOrder?.id}</span>
              <Badge className={selectedOrder?.status ? ORDER_STATUS[selectedOrder.status].color : ''}>
                <span className="flex items-center">
                  {selectedOrder?.status && ORDER_STATUS[selectedOrder.status].icon}
                  {selectedOrder?.status && ORDER_STATUS[selectedOrder.status].label}
                </span>
              </Badge>
            </SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-180px)] py-6">
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Mesa</h3>
                    <p className="text-sm">{selectedOrder.table}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Hora</h3>
                    <p className="text-sm">{selectedOrder.timestamp}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                    <p className="text-sm">{selectedOrder.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Método de pago</h3>
                    <p className="text-sm">
                      {selectedOrder.paymentMethod === 'pending' ? 'Pendiente' : 
                       selectedOrder.paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Productos</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex justify-between items-start"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <div>
                          <p className="font-medium">{item.quantity}x {item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toLocaleString('es-AR')}</p>
                        </div>
                        <p className="font-medium">${(item.quantity * item.price).toLocaleString('es-AR')}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${selectedOrder.total.toLocaleString('es-AR')}</span>
                </div>
                
                <div className="space-y-3 pt-4">
                  {selectedOrder.status === "pending" && (
                    <Button 
                      className="w-full"
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'cooking');
                      }}
                    >
                      <CookingPot className="mr-2 h-4 w-4" />
                      Enviar a cocina
                    </Button>
                  )}
                  
                  {selectedOrder.status === "cooking" && (
                    <Button 
                      className="w-full"
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'ready');
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Marcar como listo
                    </Button>
                  )}
                  
                  {selectedOrder.status === "ready" && (
                    <Button 
                      className="w-full"
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'delivered');
                      }}
                    >
                      <ChevronsRight className="mr-2 h-4 w-4" />
                      Marcar como entregado
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir ticket
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
