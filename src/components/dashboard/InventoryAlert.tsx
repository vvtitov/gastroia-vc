
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ChevronRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock data for the MVP
const lowStockItems = [
  { id: 1, name: "Carne para hamburguesa", remaining: "5 unidades", urgency: "high" },
  { id: 2, name: "Queso cheddar", remaining: "200g", urgency: "medium" },
  { id: 3, name: "Cerveza IPA", remaining: "3 botellas", urgency: "high" },
  { id: 4, name: "Pan de hamburguesa", remaining: "8 unidades", urgency: "medium" },
];

interface StockItemProps {
  name: string;
  remaining: string;
  urgency: "low" | "medium" | "high";
}

const StockItem: React.FC<StockItemProps> = ({ name, remaining, urgency }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "w-2 h-2 rounded-full",
            urgency === "high" ? "bg-red-500" : 
            urgency === "medium" ? "bg-amber-500" : 
            "bg-green-500"
          )}
        />
        <span className="font-medium">{name}</span>
      </div>
      <span className="text-sm text-muted-foreground">{remaining}</span>
    </div>
  );
};

export const InventoryAlert: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Stock bajo
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
            Ver todo
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 divide-y">
          {lowStockItems.map((item) => (
            <StockItem 
              key={item.id}
              name={item.name}
              remaining={item.remaining}
              urgency={item.urgency as "low" | "medium" | "high"}
            />
          ))}
        </div>
        <Button className="w-full mt-4" size="sm">
          <Package className="mr-2 h-4 w-4" />
          Pedir reabastecimiento
        </Button>
      </CardContent>
    </Card>
  );
};
