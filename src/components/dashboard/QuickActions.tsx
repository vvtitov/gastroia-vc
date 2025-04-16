
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  ChevronRight, 
  ShoppingCart, 
  PackageOpen, 
  Users, 
  BarChart3 
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  to: string;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  icon,
  description,
  to,
  color,
}) => (
  <Link to={to} className="block">
    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <h3 className="font-medium text-base mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export const QuickActions: React.FC<{ userType: 'business' | 'provider' }> = ({ userType }) => {
  const businessActions = [
    {
      title: "Nuevo Pedido",
      icon: <ShoppingCart className="text-white h-5 w-5" />,
      description: "Crear una orden de compra para tus clientes",
      to: "/cashier",
      color: "bg-blue-500",
    },
    {
      title: "Gestionar Stock",
      icon: <PackageOpen className="text-white h-5 w-5" />,
      description: "Revisar tu inventario y solicitar productos",
      to: "/stock",
      color: "bg-amber-500",
    },
    {
      title: "Personal",
      icon: <Users className="text-white h-5 w-5" />,
      description: "Administrar a tus empleados y turnos",
      to: "/employees",
      color: "bg-emerald-500",
    },
    {
      title: "Reportes",
      icon: <BarChart3 className="text-white h-5 w-5" />,
      description: "Ver estadísticas y análisis de ventas",
      to: "/analytics",
      color: "bg-purple-500",
    },
  ];

  const providerActions = [
    {
      title: "Mis Productos",
      icon: <PackageOpen className="text-white h-5 w-5" />,
      description: "Administrar catálogo de productos",
      to: "/products",
      color: "bg-blue-500",
    },
    {
      title: "Pedidos",
      icon: <ShoppingCart className="text-white h-5 w-5" />,
      description: "Ver y gestionar pedidos de clientes",
      to: "/orders",
      color: "bg-amber-500",
    },
    {
      title: "Mensajes",
      icon: <Users className="text-white h-5 w-5" />,
      description: "Contactar con tus clientes",
      to: "/messages",
      color: "bg-emerald-500",
    },
    {
      title: "Reportes",
      icon: <BarChart3 className="text-white h-5 w-5" />,
      description: "Ver estadísticas de ventas y productos",
      to: "/analytics",
      color: "bg-purple-500",
    },
  ];

  const actionItems = userType === 'business' ? businessActions : providerActions;

  return (
    <Card>
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-lg font-medium">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {actionItems.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
