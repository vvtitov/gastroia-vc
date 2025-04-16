
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Clock, ShoppingCart, PackageOpen, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "info" | "pending";
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  status = "info",
}) => {
  const statusColors = {
    success: "bg-green-100 text-green-600",
    warning: "bg-amber-100 text-amber-600",
    info: "bg-blue-100 text-blue-600",
    pending: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0 mb-3 last:mb-0">
      <div className={cn("p-2 rounded-full", statusColors[status])}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <span className="text-xs text-muted-foreground mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};

export const RecentActivity: React.FC<{ userType: 'business' | 'provider' }> = ({ userType }) => {
  const businessActivities = [
    {
      icon: <CircleCheck className="h-4 w-4" />,
      title: "Pedido completado",
      description: "El pedido #4312 a Proveedor ABC fue entregado",
      timestamp: "Hace 30 minutos",
      status: "success" as const,
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      title: "Nuevo pedido",
      description: "Se realizó un pedido nuevo a Proveedor XYZ",
      timestamp: "Hace 2 horas",
      status: "info" as const,
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Stock bajo",
      description: "Aceite de oliva está por debajo del mínimo",
      timestamp: "Hace 5 horas",
      status: "warning" as const,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      title: "Pedido pendiente",
      description: "El pedido #4310 está en camino",
      timestamp: "Hace 1 día",
      status: "pending" as const,
    },
  ];

  const providerActivities = [
    {
      icon: <CircleCheck className="h-4 w-4" />,
      title: "Pedido entregado",
      description: "Entrega exitosa al Restaurante Los Amigos",
      timestamp: "Hace 45 minutos",
      status: "success" as const,
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      title: "Nuevo pedido recibido",
      description: "Pedido de Bar La Esquina",
      timestamp: "Hace 3 horas",
      status: "info" as const,
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Stock bajo",
      description: "Necesitas reponer el aceite de oliva",
      timestamp: "Hace 6 horas",
      status: "warning" as const,
    },
    {
      icon: <PackageOpen className="h-4 w-4" />,
      title: "Producto actualizado",
      description: "Cambiaste el precio de Harina 000",
      timestamp: "Hace 1 día",
      status: "info" as const,
    },
  ];

  const activities = userType === 'business' ? businessActivities : providerActivities;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Actividad Reciente</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
            Ver todo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </CardContent>
    </Card>
  );
};
