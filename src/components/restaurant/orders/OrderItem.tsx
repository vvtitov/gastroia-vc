
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronsRight, CookingPot, CheckCircle, Printer } from "lucide-react";
import { OrderStatusBadge, OrderStatus } from "./OrderStatusBadge";
import { OrderType } from "@/types/orders";

interface OrderItemProps {
  order: OrderType;
  onViewOrder: (order: OrderType) => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({ 
  order, 
  onViewOrder, 
  onUpdateStatus 
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.table}</TableCell>
      <TableCell>{order.timestamp}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell>${order.total.toLocaleString('es-AR')}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewOrder(order)}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
          
          {order.status === "pending" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onUpdateStatus(order.id, 'cooking')}
              className="h-8 w-8 p-0"
            >
              <CookingPot className="h-4 w-4" />
            </Button>
          )}
          
          {order.status === "cooking" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onUpdateStatus(order.id, 'ready')}
              className="h-8 w-8 p-0"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
          
          {order.status === "ready" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onUpdateStatus(order.id, 'delivered')}
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
  );
};
