
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
      <DemoBanner />
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div>
            <h2 className="text-xl font-bold mb-1">
              Demo de {userType === "business" ? "Restaurante" : "Proveedor"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Explora todas las funcionalidades sin necesidad de crear una cuenta
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={userType}
              onValueChange={(value) => setUserType(value as "business" | "provider")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Vista Restaurante</SelectItem>
                <SelectItem value="provider">Vista Proveedor</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={toggleUserType}>
              Cambiar a {userType === "business" ? "Proveedor" : "Restaurante"}
            </Button>
          </div>
        </motion.div>

        {userType === "business" ? (
          <BusinessDashboard businessName={businessName} />
        ) : (
          <ProviderDashboard />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Demo;
