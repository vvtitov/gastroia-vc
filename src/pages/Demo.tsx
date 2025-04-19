
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { ProviderDashboard } from "@/components/dashboard/ProviderDashboard";
import { DemoBanner } from "@/components/dashboard/DemoBanner";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

const Demo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("Mi Restaurante");

  const userType = searchParams.get("type") || "business";

  const toggleUserType = () => {
    const newType = userType === "business" ? "provider" : "business";
    searchParams.set("type", newType);
    setSearchParams(searchParams);
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
        demoType={userType as "business" | "provider"} 
        onToggleView={toggleUserType}
      />
      <motion.div
        className="flex flex-col gap-4 md:gap-6 lg:gap-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {userType === "business" ? (
          <BusinessDashboard businessName={businessName} />
        ) : (
          <ProviderDashboard businessName={businessName} />
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Demo;
