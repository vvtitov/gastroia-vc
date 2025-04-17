
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronsRight, CheckCircle, CookingPot, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { OrderStatusBadge, OrderStatus, ORDER_STATUS } from "./OrderStatusBadge";
import { OrderType } from "./OrdersList";

interface OrderDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: OrderType | null;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderDetailSheet: React.FC<OrderDetailSheetProps> = ({
  open,
  onOpenChange,
  selectedOrder,
  onUpdateStatus
}) => {
  if (!selectedOrder) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Pedido {selectedOrder.id}</span>
            <OrderStatusBadge status={selectedOrder.status} />
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] py-6">
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
                    onUpdateStatus(selectedOrder.id, 'cooking');
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
                    onUpdateStatus(selectedOrder.id, 'ready');
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
                    onUpdateStatus(selectedOrder.id, 'delivered');
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
