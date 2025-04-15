
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, MapPin, Clock, Phone } from "lucide-react";

const Business = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mi Negocio</h1>

        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del negocio</label>
                <div className="flex gap-4">
                  <Input placeholder="La Trattoria" />
                  <Button>Guardar</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input placeholder="Av. Principal 123" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <Input placeholder="+1 234 567 890" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Horario de atención</label>
                <Input placeholder="Lun-Vie: 11:00-23:00, Sáb-Dom: 12:00-00:00" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Business;
