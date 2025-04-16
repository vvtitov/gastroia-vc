
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface RegisterFormValues {
  business_name?: string;
  provider_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("business");
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RegisterFormValues>();
  const password = watch("password");
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  useEffect(() => {
    reset();
  }, [activeTab, reset]);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      const metadata = {
        first_name: data.first_name,
        last_name: data.last_name,
        business_name: activeTab === "business" ? data.business_name : undefined,
        provider_name: activeTab === "provider" ? data.provider_name : undefined,
        account_type: activeTab,
      };
      
      const { error } = await signUp(data.email, data.password, metadata);
      
      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registro exitoso",
          description: "Bienvenido a GastroIA",
        });
      }
    } catch (error) {
      toast({
        title: "Error al registrarse",
        description: "Ha ocurrido un error inesperado, por favor intenta nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="business" className="flex-1">Negocio</TabsTrigger>
                <TabsTrigger value="provider" className="flex-1">Proveedor</TabsTrigger>
              </TabsList>
              <TabsContent value="business">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Nombre del negocio</Label>
                    <Input 
                      id="business-name" 
                      placeholder="Ej. Restaurante El Sabor" 
                      {...register("business_name", { required: "El nombre del negocio es obligatorio" })}
                    />
                    {errors.business_name && (
                      <p className="text-sm font-medium text-destructive">{errors.business_name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nombre</Label>
                      <Input 
                        id="first-name" 
                        placeholder="Ej. Juan" 
                        {...register("first_name", { required: "El nombre es obligatorio" })}
                      />
                      {errors.first_name && (
                        <p className="text-sm font-medium text-destructive">{errors.first_name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Apellido</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Ej. Pérez" 
                        {...register("last_name", { required: "El apellido es obligatorio" })}
                      />
                      {errors.last_name && (
                        <p className="text-sm font-medium text-destructive">{errors.last_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@negocio.com" 
                      {...register("email", { 
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      {...register("password", { 
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres"
                        }
                      })}
                    />
                    {errors.password && (
                      <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      {...register("confirmPassword", { 
                        required: "Por favor confirma tu contraseña",
                        validate: value => value === password || "Las contraseñas no coinciden"
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar negocio"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="provider">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-name">Nombre de la empresa proveedora</Label>
                    <Input 
                      id="provider-name" 
                      placeholder="Ej. Distribuidora de Alimentos S.A." 
                      {...register("provider_name", { required: "El nombre de la empresa es obligatorio" })}
                    />
                    {errors.provider_name && (
                      <p className="text-sm font-medium text-destructive">{errors.provider_name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nombre de contacto</Label>
                      <Input 
                        id="first-name" 
                        placeholder="Ej. María" 
                        {...register("first_name", { required: "El nombre es obligatorio" })}
                      />
                      {errors.first_name && (
                        <p className="text-sm font-medium text-destructive">{errors.first_name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Apellido</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Ej. Rodríguez" 
                        {...register("last_name", { required: "El apellido es obligatorio" })}
                      />
                      {errors.last_name && (
                        <p className="text-sm font-medium text-destructive">{errors.last_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contacto@proveedor.com" 
                      {...register("email", { 
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      {...register("password", { 
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres"
                        }
                      })}
                    />
                    {errors.password && (
                      <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      {...register("confirmPassword", { 
                        required: "Por favor confirma tu contraseña",
                        validate: value => value === password || "Las contraseñas no coinciden"
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</p>
                    )}
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
