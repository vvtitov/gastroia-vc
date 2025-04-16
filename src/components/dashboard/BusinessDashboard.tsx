
import React from "react";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { InventoryAlert } from "@/components/dashboard/InventoryAlert";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BarChart3, ShoppingCart, Users, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BusinessDashboardProps {
  businessName: string;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ businessName }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Bienvenido a {businessName}
      </h1>
      
      <p className="text-muted-foreground">
        Visualiza y gestiona todos los aspectos de tu negocio desde un solo lugar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          title="Ventas Hoy"
          value="$4,329"
          icon={BarChart3}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Pedidos Pendientes"
          value="24"
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Empleados Activos"
          value="8"
          icon={Users}
        />
        <StatCard 
          title="Tiempo Promedio"
          value="14 min"
          icon={Clock}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className={`${isMobile ? "" : "col-span-2"}`}>
          <SalesChart />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <InventoryAlert />
          <RecentActivity userType="business" />
        </div>
      </div>
    </div>
  );
};
