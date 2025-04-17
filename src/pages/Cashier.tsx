
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TablesGrid } from "@/components/restaurant/TablesGrid";
import { RestaurantOrders } from "@/components/restaurant/RestaurantOrders";
import { TableManagement } from "@/components/restaurant/TableManagement";
import { InternalChat } from "@/components/staff/InternalChat";
import { motion } from "framer-motion";

const Cashier = () => {
  const [activeTab, setActiveTab] = useState("tables");

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Caja</h1>
          
          <div className="flex items-center gap-2">
            <Button className="bg-gastro hover:bg-gastro-dark">Abrir Caja</Button>
            <Button variant="outline">Cerrar Caja</Button>
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
