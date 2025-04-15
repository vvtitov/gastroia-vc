
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ChefHat,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the MVP
const orders = [
  {
    id: "ORD-1234",
    customer: "Mesa 5",
    time: "12:30 PM",
    items: [
      { name: "Hamburguesa Clásica", quantity: 2, price: 12.95 },
      { name: "Papas Fritas Grande", quantity: 1, price: 5.50 }
    ],
    total: 31.40,
    status: "preparing",
  },
  {
    id: "ORD-1235",
    customer: "Mesa 3",
    time: "12:25 PM",
    items: [
      { name: "Pizza Margarita", quantity: 1, price: 14.50 },
      { name: "Refresco Cola", quantity: 2, price: 3.50 }
    ],
    total: 21.50,
    status: "ready",
  },
  {
    id: "ORD-1236",
    customer: "Mesa 8",
    time: "12:15 PM",
    items: [
      { name: "Tacos de Carnitas", quantity: 3, price: 3.95 },
      { name: "Guacamole", quantity: 1, price: 4.95 },
      { name: "Cerveza", quantity: 3, price: 4.50 }
    ],
    total: 31.85,
    status: "completed",
  },
  {
    id: "ORD-1237",
    customer: "Mesa 2",
    time: "12:05 PM",
    items: [
      { name: "Ensalada César", quantity: 2, price: 9.95 },
      { name: "Agua Mineral", quantity: 1, price: 2.50 }
    ],
    total: 22.40,
    status: "completed",
  },
  {
    id: "ORD-1238",
    customer: "Mesa 10",
    time: "11:55 AM",
    items: [
      { name: "Café Americano", quantity: 4, price: 2.50 },
      { name: "Croissant", quantity: 2, price: 3.25 }
    ],
    total: 16.50,
    status: "completed",
  },
  {
    id: "ORD-1239",
    customer: "Mesa 7",
    time: "11:45 AM",
    items: [
      { name: "Desayuno Completo", quantity: 2, price: 15.95 },
      { name: "Jugo de Naranja", quantity: 2, price: 3.50 }
    ],
    total: 38.90,
    status: "completed",
  },
  {
    id: "ORD-1240",
    customer: "Mesa 4",
    time: "11:30 AM",
    items: [
      { name: "Sandwich de Pollo", quantity: 1, price: 8.95 },
      { name: "Papas Fritas", quantity: 1, price: 3.50 },
      { name: "Refresco", quantity: 1, price: 2.95 }
    ],
    total: 15.40,
    status: "cancelled",
  },
];

const getStatusDetails = (status: string) => {
  switch (status) {
    case "preparing":
      return {
        label: "Preparando",
        icon: <ChefHat className="h-4 w-4" />,
        color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      };
    case "ready":
      return {
        label: "Listo",
        icon: <Clock className="h-4 w-4" />,
        color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      };
    case "completed":
      return {
        label: "Completado",
        icon: <CheckCircle className="h-4 w-4" />,
        color: "bg-green-100 text-green-800 hover:bg-green-200",
      };
    case "cancelled":
      return {
        label: "Cancelado",
        icon: <AlertCircle className="h-4 w-4" />,
        color: "bg-red-100 text-red-800 hover:bg-red-200",
      };
    default:
      return {
        label: "Desconocido",
        icon: null,
        color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      };
  }
};

interface OrderDetailsProps {
  order: typeof orders[0];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const statusDetails = getStatusDetails(order.status);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{order.customer}</CardTitle>
            <CardDescription>ID: {order.id} • {order.time}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn("flex items-center gap-1 w-fit py-1", statusDetails.color)}
          >
            {statusDetails.icon}
            {statusDetails.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-medium mb-2">Productos</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.quantity}x</span> {item.name}
                  </div>
                  <div className="text-muted-foreground">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between font-medium">
            <div>Total</div>
            <div>${order.total.toFixed(2)}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {order.status === "preparing" && (
              <Button className="flex-1">Marcar como listo</Button>
            )}
            {order.status === "ready" && (
              <Button className="flex-1">Marcar como completado</Button>
            )}
            {(order.status === "preparing" || order.status === "ready") && (
              <Button variant="outline" className="flex-1">Cancelar pedido</Button>
            )}
            {order.status === "completed" && (
              <Button variant="outline" className="flex-1">Imprimir recibo</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = React.useState<typeof orders[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo pedido
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar pedidos..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="preparing">Preparando</TabsTrigger>
            <TabsTrigger value="ready">Listos</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const statusDetails = getStatusDetails(order.status);
                      
                      return (
                        <TableRow 
                          key={order.id}
                          className={cn(
                            "cursor-pointer hover:bg-muted/50",
                            selectedOrder?.id === order.id && "bg-muted"
                          )}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={cn("flex items-center gap-1 w-fit py-1", statusDetails.color)}
                            >
                              {statusDetails.icon}
                              {statusDetails.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <div className="sticky top-6">
                {selectedOrder ? (
                  <OrderDetails order={selectedOrder} />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">Selecciona un pedido</h3>
                      <p className="text-sm text-muted-foreground">
                        Haz clic en un pedido para ver los detalles
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
