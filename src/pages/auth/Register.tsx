
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // In the real implementation, we would register the user here
    // For the MVP, we'll just simulate a registration delay and redirect
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gastro-bg">
      <div className="w-full px-4 sm:w-[500px]">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-gastro rounded-md p-2">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">GastroIA</h1>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Crear nueva cuenta</CardTitle>
            <CardDescription>
              Ingresa tus datos para registrar tu negocio en GastroIA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business" className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="business" className="flex-1">Negocio</TabsTrigger>
                <TabsTrigger value="provider" className="flex-1">Proveedor</TabsTrigger>
              </TabsList>
              <TabsContent value="business">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Nombre del negocio</Label>
                    <Input id="business-name" placeholder="Ej. Restaurante El Sabor" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nombre</Label>
                      <Input id="first-name" placeholder="Ej. Juan" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Apellido</Label>
                      <Input id="last-name" placeholder="Ej. Pérez" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@negocio.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" required />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar negocio"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="provider">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-name">Nombre de la empresa proveedora</Label>
                    <Input id="provider-name" placeholder="Ej. Distribuidora de Alimentos S.A." required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nombre de contacto</Label>
                      <Input id="contact-name" placeholder="Ej. María" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-last-name">Apellido</Label>
                      <Input id="contact-last-name" placeholder="Ej. Rodríguez" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider-email">Email</Label>
                    <Input id="provider-email" type="email" placeholder="contacto@proveedor.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="provider-password">Contraseña</Label>
                    <Input id="provider-password" type="password" placeholder="••••••••" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider-confirm-password">Confirmar contraseña</Label>
                    <Input id="provider-confirm-password" type="password" placeholder="••••••••" required />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar como proveedor"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/auth/login" className="text-gastro hover:underline">
                Iniciar sesión
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © 2025 GastroIA · Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};

export default Register;
