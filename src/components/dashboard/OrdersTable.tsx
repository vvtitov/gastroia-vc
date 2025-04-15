
import React from "react";
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
  Clock,
  CheckCircle, 
  AlertCircle, 
  ChevronDown,
  ChefHat
} from "lucide-react";
import { cn } from "@/lib/utils";

// This is mockup data for the MVP
const orders = [
  {
    id: "ORD-1234",
    customer: "Mesa 5",
    time: "12:30 PM",
    items: "2x Hamburguesa, 1x Papas",
    total: "$45.90",
    status: "preparing",
  },
  {
    id: "ORD-1235",
    customer: "Mesa 3",
    time: "12:25 PM",
    items: "1x Pizza, 2x Refresco",
    total: "$36.50",
    status: "ready",
  },
  {
    id: "ORD-1236",
    customer: "Mesa 8",
    time: "12:15 PM",
    items: "3x Tacos, 1x Guacamole, 3x Cerveza",
    total: "$62.75",
    status: "completed",
  },
  {
    id: "ORD-1237",
    customer: "Mesa 2",
    time: "12:05 PM",
    items: "2x Ensalada César, 1x Agua",
    total: "$28.50",
    status: "completed",
  },
  {
    id: "ORD-1238",
    customer: "Mesa 10",
    time: "11:55 AM",
    items: "4x Café, 2x Croissant",
    total: "$22.00",
    status: "completed",
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

export const OrdersTable: React.FC = () => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Pedidos recientes</h3>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          Ver todos <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const statusDetails = getStatusDetails(order.status);
              
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell className="max-w-[120px] md:max-w-[200px] truncate" title={order.items}>
                    {order.items}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
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
  );
};
