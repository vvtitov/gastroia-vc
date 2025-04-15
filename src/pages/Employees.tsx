
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Calendar, Clock } from "lucide-react";

const Employees = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Empleados</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo empleado
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-gastro-bg flex items-center justify-center">
                <span className="text-xl font-bold text-gastro">JD</span>
              </div>
              <div>
                <h3 className="font-medium">Juan Díaz</h3>
                <p className="text-sm text-muted-foreground">Mozo</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Lunes a Viernes</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>18:00 - 24:00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
