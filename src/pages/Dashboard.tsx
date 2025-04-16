
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { InventoryAlert } from "@/components/dashboard/InventoryAlert";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BarChart3, ShoppingCart, Users, Clock, ChefHat, PackageOpen, TruckIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoView, setIsDemoView] = useState(false);
  const [demoType, setDemoType] = useState<'business' | 'provider'>('business');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const demo = urlParams.get('demo');
    if (demo === 'true') {
      setIsDemoView(true);
      const type = urlParams.get('type') as 'business' | 'provider';
      setDemoType(type || 'business');
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);
  
  const userType = isDemoView ? demoType : (profile?.user_type || 'business');
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gastro"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isDemoView && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Estás en el modo demostración - {demoType === 'business' ? 'Vista de Negocio' : 'Vista de Proveedor'}
                </p>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold">
          {userType === 'business'
            ? `Bienvenido a ${isDemoView ? 'Restaurante Demo' : (profile?.business_name || 'GastroIA')}`
            : `Bienvenido a ${isDemoView ? 'Proveedor Demo' : (profile?.business_name || 'GastroIA')}`}
        </h1>

        <p className="text-muted-foreground">
          {userType === 'business'
            ? "Visualiza y gestiona todos los aspectos de tu negocio desde un solo lugar."
            : "Gestiona tus productos, pedidos y comunícate con tus clientes."}
        </p>

        {/* Quick Actions */}
        <QuickActions userType={userType} />

        {userType === 'business' ? (
          <>
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
                <RecentActivity userType={userType} />
              </div>
            </div>
          </>
        ) : (
          <>
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
                <RecentActivity userType={userType} />
              </div>
            </div>
          </>
        )}

        <div className="mt-8 pt-2">
          <OrdersTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
