
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { InventoryAlert } from "@/components/dashboard/InventoryAlert";
import { ChatbotPreview } from "@/components/dashboard/ChatbotPreview";
import { BarChart3, ShoppingCart, Users, Clock, ChefHat } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Bienvenido a GastroIA</h1>
        <p className="text-muted-foreground">
          Visualiza y gestiona todos los aspectos de tu negocio desde un solo lugar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SalesChart />
          <div className="space-y-6">
            <InventoryAlert />
            <ChatbotPreview />
          </div>
        </div>

        <div className="mt-6">
          <OrdersTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
