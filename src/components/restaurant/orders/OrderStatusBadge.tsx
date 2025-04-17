
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CookingPot, AlertTriangle, CheckCircle } from "lucide-react";

export type OrderStatus = 'pending' | 'cooking' | 'ready' | 'delivered';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

// Order status configuration
export const ORDER_STATUS = {
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

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  return (
    <Badge className={ORDER_STATUS[status].color}>
      <span className="flex items-center">
        {ORDER_STATUS[status].icon}
        {ORDER_STATUS[status].label}
      </span>
    </Badge>
  );
};
