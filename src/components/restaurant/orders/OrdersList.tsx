
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatusBadge";

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

interface OrdersListProps {
  orders: OrderType[];
  filteredOrders: OrderType[];
  onViewOrder: (order: OrderType) => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  filteredOrders,
  onViewOrder,
  onUpdateStatus
}) => {
  return (
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
                <OrderItem 
                  key={order.id}
                  order={order}
                  onViewOrder={onViewOrder}
                  onUpdateStatus={onUpdateStatus}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
