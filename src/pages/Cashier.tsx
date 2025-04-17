
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablesGrid } from "@/components/restaurant/TablesGrid";
import { RestaurantOrders } from "@/components/restaurant/RestaurantOrders";
import { TableManagement } from "@/components/restaurant/TableManagement";
import { InternalChat } from "@/components/staff/InternalChat";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const Cashier = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const [isCashOpen, setIsCashOpen] = useState(false);

  const handleToggleCash = () => {
    setIsCashOpen(!isCashOpen);
    toast({
      title: isCashOpen ? "Caja cerrada" : "Caja abierta",
      description: isCashOpen 
        ? "Has cerrado la caja correctamente" 
        : "Has abierto la caja correctamente",
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Caja</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              className={isCashOpen ? "bg-red-600 hover:bg-red-700" : "bg-gastro hover:bg-gastro-dark"}
              onClick={handleToggleCash}
            >
              {isCashOpen ? "Cerrar Caja" : "Abrir Caja"}
            </Button>
            {isCashOpen && (
              <Button variant="outline">Resumen de Caja</Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex overflow-auto pb-2">
            <TabsList>
              <TabsTrigger value="tables">Mesas</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="management">Administrar</TabsTrigger>
              <TabsTrigger value="chat">Comunicación</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="pt-4">
            <TabsContent value="tables" className="m-0">
              <TablesGrid />
            </TabsContent>
            
            <TabsContent value="orders" className="m-0">
              <RestaurantOrders />
            </TabsContent>
            
            <TabsContent value="management" className="m-0">
              <TableManagement />
            </TabsContent>
            
            <TabsContent value="chat" className="m-0">
              <InternalChat />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default Cashier;
