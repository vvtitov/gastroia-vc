
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { DemoBanner } from "@/components/dashboard/DemoBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { useState, useEffect } from "react";

const Demo = () => {
  const [demoType, setDemoType] = useState<'business' | 'provider'>('business');
  const [businessName, setBusinessName] = useState('Restaurante Demo');

  useEffect(() => {
    // Check if we have a type specified in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') as 'business' | 'provider';
    
    if (type === 'provider') {
      setDemoType('provider');
      setBusinessName('Proveedor Demo');
    } else {
      setDemoType('business');
      setBusinessName('Restaurante Demo');
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DemoBanner demoType={demoType} />

        {demoType === 'business' ? (
          <BusinessDashboard businessName={businessName} />
        ) : (
          <ProviderDashboard businessName={businessName} />
        )}

        {/* Quick Actions */}
        <QuickActions userType={demoType} />

        <div className="mt-8 pt-2">
          <OrdersTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Demo;
