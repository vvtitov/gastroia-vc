
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // In the real implementation, we would authenticate the user here
    // For the MVP, we'll just simulate a login delay and redirect
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gastro-bg">
      <div className="w-full px-4 sm:w-[450px]">
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
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@negocio.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link 
                    to="/auth/forgot-password"
                    className="text-sm text-gastro hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Recordarme
                </Label>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
              
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link to="/auth/register" className="text-gastro hover:underline">
                  Regístrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © 2025 GastroIA · Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;
