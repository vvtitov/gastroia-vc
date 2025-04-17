
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface OrdersFilterProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({
  selectedStatus,
  setSelectedStatus
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Tabs 
        value={selectedStatus} 
        onValueChange={setSelectedStatus} 
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-5 w-full sm:w-auto">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="cooking">En cocina</TabsTrigger>
          <TabsTrigger value="ready">Listos</TabsTrigger>
          <TabsTrigger value="delivered">Entregados</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex w-full sm:w-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar pedidos..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
