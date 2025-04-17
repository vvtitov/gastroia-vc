
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, MapPin, Clock, Phone, Calendar, X, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

type BusinessDay = {
  id: number;
  day: string;
  active: boolean;
  openTime: string;
  closeTime: string;
}

const DAYS_OF_WEEK = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

const Business = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [businessName, setBusinessName] = useState("La Trattoria");
  const [businessType, setBusinessType] = useState("restaurant");
  const [businessSchedule, setBusinessSchedule] = useState<BusinessDay[]>([
    { id: 1, day: "Lunes", active: true, openTime: "11:00", closeTime: "23:00" },
    { id: 2, day: "Martes", active: true, openTime: "11:00", closeTime: "23:00" },
    { id: 3, day: "Miércoles", active: true, openTime: "11:00", closeTime: "23:00" },
    { id: 4, day: "Jueves", active: true, openTime: "11:00", closeTime: "23:00" },
    { id: 5, day: "Viernes", active: true, openTime: "11:00", closeTime: "23:30" },
    { id: 6, day: "Sábado", active: true, openTime: "12:00", closeTime: "00:00" },
    { id: 7, day: "Domingo", active: false, openTime: "12:00", closeTime: "22:00" },
  ]);
  
  const handleBusinessNameSave = () => {
    toast({
      title: "¡Nombre guardado!",
      description: `Tu negocio ahora se llamará "${businessName}"`,
    });
  };
  
  const handleScheduleChange = (id: number, field: string, value: string | boolean) => {
    const updatedSchedule = businessSchedule.map(day => {
      if (day.id === id) {
        return { ...day, [field]: value };
      }
      return day;
    });
    
    setBusinessSchedule(updatedSchedule);
  };
  
  const handleApplyScheduleToAll = (dayData: BusinessDay) => {
    const { openTime, closeTime } = dayData;
    const updatedSchedule = businessSchedule.map(day => ({
      ...day,
      openTime,
      closeTime
    }));
    
    setBusinessSchedule(updatedSchedule);
    
    toast({
      title: "Horario actualizado",
      description: "El horario se ha aplicado a todos los días",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Mi Negocio
        </motion.h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="hours">Horarios</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    <span>Información General</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Nombre del negocio</Label>
                      <div className="flex gap-4">
                        <Input 
                          placeholder="La Trattoria" 
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <Button onClick={handleBusinessNameSave}>Guardar</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Tipo de negocio</Label>
                      <Select 
                        value={businessType} 
                        onValueChange={setBusinessType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurante</SelectItem>
                          <SelectItem value="bar">Bar</SelectItem>
                          <SelectItem value="cafe">Café</SelectItem>
                          <SelectItem value="fast_food">Comida Rápida</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Dirección</Label>
                      <Input placeholder="Av. Principal 123" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Ciudad</Label>
                        <Input placeholder="Buenos Aires" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Código Postal</Label>
                        <Input placeholder="C1001" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Teléfono</Label>
                      <Input placeholder="+1 234 567 890" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Email</Label>
                      <Input placeholder="info@latrattoria.com" type="email" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Ubicación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-slate-800 rounded-md aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground">Mapa interactivo (próximamente)</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="hours">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Horarios de Atención</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {businessSchedule.map((day) => (
                      <motion.div 
                        key={day.id}
                        className="grid grid-cols-6 gap-4 items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: day.id * 0.05 }}
                      >
                        <div className="space-y-1 col-span-2 md:col-span-1">
                          <Label>{day.day}</Label>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={day.active}
                              onCheckedChange={(checked) => handleScheduleChange(day.id, 'active', checked)} 
                            />
                            <span className="text-sm text-muted-foreground">{day.active ? 'Abierto' : 'Cerrado'}</span>
                          </div>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <Label>Horario de Apertura</Label>
                          <Input 
                            type="time" 
                            value={day.openTime}
                            onChange={(e) => handleScheduleChange(day.id, 'openTime', e.target.value)}
                            disabled={!day.active}
                          />
                        </div>
                        <div className="space-y-1 col-span-2">
                          <Label>Horario de Cierre</Label>
                          <Input 
                            type="time" 
                            value={day.closeTime}
                            onChange={(e) => handleScheduleChange(day.id, 'closeTime', e.target.value)}
                            disabled={!day.active}
                          />
                        </div>
                        {day.active && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4" 
                            onClick={() => handleApplyScheduleToAll(day)}
                          >
                            Aplicar a todos
                          </Button>
                        )}
                      </motion.div>
                    ))}
                    
                    <div className="pt-4 flex justify-end">
                      <Button onClick={() => {
                        toast({
                          title: "Horarios guardados",
                          description: "Los horarios de tu negocio se han actualizado correctamente",
                        });
                      }}>
                        Guardar horarios
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Moneda</Label>
                  <Select defaultValue="ars">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ars">Peso Argentino (ARS)</SelectItem>
                      <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Zona horaria</Label>
                  <Select defaultValue="america_argentina_buenos_aires">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_argentina_buenos_aires">America/Argentina/Buenos Aires</SelectItem>
                      <SelectItem value="america_santiago">America/Santiago</SelectItem>
                      <SelectItem value="america_sao_paulo">America/Sao Paulo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Recibir notificaciones por email</Label>
                    <p className="text-xs text-muted-foreground">Recibe alertas sobre pedidos y reservas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Business;
