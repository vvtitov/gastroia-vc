
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { DemoBanner } from "@/components/dashboard/DemoBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { AnimatePresence, motion } from "framer-motion";

const Demo = () => {
  const [demoType, setDemoType] = useState<'business' | 'provider'>('business');
  const [businessName, setBusinessName] = useState('Restaurante Demo');
  const [loaded, setLoaded] = useState(false);

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
    
    // Add a small delay to allow for animation
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleToggleView = () => {
    const newType = demoType === 'business' ? 'provider' : 'business';
    setDemoType(newType);
    setBusinessName(newType === 'business' ? 'Restaurante Demo' : 'Proveedor Demo');
    
    // Update URL without reloading the page
    const url = new URL(window.location.href);
    url.searchParams.set('type', newType);
    window.history.pushState({}, '', url);
  };

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <DemoBanner demoType={demoType} onToggleView={handleToggleView} />

          <AnimatePresence mode="wait">
            <motion.div
              key={demoType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {demoType === 'business' ? (
                <BusinessDashboard businessName={businessName} />
              ) : (
                <ProviderDashboard businessName={businessName} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <QuickActions userType={demoType} />
          </motion.div>

          <motion.div 
            className="mt-8 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <OrdersTable isDemoMode={true} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Demo;
