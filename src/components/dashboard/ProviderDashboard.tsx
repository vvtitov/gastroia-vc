
import React from "react";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BarChart3, ShoppingCart, PackageOpen, TruckIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProviderDashboardProps {
  businessName: string;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ businessName }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Bienvenido a {businessName}
      </h1>
      
      <p className="text-muted-foreground">
        Gestiona tus productos, pedidos y comunícate con tus clientes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          title="Ventas Totales"
          value="$18,743"
          icon={BarChart3}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Pedidos Nuevos"
          value="12"
          icon={ShoppingCart}
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard 
          title="Productos"
          value="56"
          icon={PackageOpen}
        />
        <StatCard 
          title="Entregas Hoy"
          value="8"
          icon={TruckIcon}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className={`${isMobile ? "" : "col-span-2"}`}>
          <SalesChart />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Stock Bajo</h3>
              <PackageOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm border-b pb-2">
                <span>Aceite de Oliva (1L)</span>
                <span className="font-medium text-amber-600">5 unidades</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span>Harina 000 (1Kg)</span>
                <span className="font-medium text-red-600">2 unidades</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Queso Mozzarella (5Kg)</span>
                <span className="font-medium text-amber-600">3 unidades</span>
              </div>
            </div>
          </div>
          <RecentActivity userType="provider" />
        </div>
      </div>
    </div>
  );
};
