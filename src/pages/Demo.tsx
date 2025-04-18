
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoBanner } from "@/components/dashboard/DemoBanner";
import { motion } from "framer-motion";

const Demo = () => {
  const [userType, setUserType] = useState<"business" | "provider">("business");
  const [businessName, setBusinessName] = useState("Mi Restaurante");

  const toggleUserType = () => {
    setUserType(userType === "business" ? "provider" : "business");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <DashboardLayout>
      <DemoBanner 
        demoType={userType} 
        onToggleView={toggleUserType}
      />
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        {userType === "business" ? (
          <BusinessDashboard businessName={businessName} />
        ) : (
          <ProviderDashboard businessName={businessName} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Demo;
