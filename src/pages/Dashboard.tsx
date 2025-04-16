
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { DemoBanner } from "@/components/dashboard/DemoBanner";

const Dashboard = () => {
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
  const businessName = isDemoView 
    ? userType === 'business' ? 'Restaurante Demo' : 'Proveedor Demo' 
    : (profile?.business_name || 'GastroIA');
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardLoading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isDemoView && <DemoBanner demoType={demoType} />}

        {userType === 'business' ? (
          <BusinessDashboard businessName={businessName} />
        ) : (
          <ProviderDashboard businessName={businessName} />
        )}

        {/* Quick Actions */}
        <QuickActions userType={userType} />

        <div className="mt-8 pt-2">
          <OrdersTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
