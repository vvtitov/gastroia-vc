
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { useUserType } from "@/contexts/UserTypeContext";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { userType } = useUserType();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {

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
  
  const businessName = profile?.business_name || 'GastroIA';

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardLoading />
      </DashboardLayout>
    );
  }

  // Type change handling is now in TopNavbar

  return (
    <DashboardLayout>
      <div className="space-y-6">

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
