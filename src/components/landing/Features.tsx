
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, MessageSquare, BarChart3, Package, ChevronRight } from "lucide-react";

const featuresList = [
  {
    icon: Utensils,
    title: "Gestión de pedidos",
    description: "Automatiza la toma de pedidos y mejora la comunicación entre sala y cocina."
  },
  {
    icon: MessageSquare,
    title: "Chatbot IA",
    description: "Atiende a tus clientes 24/7 con un asistente virtual inteligente y personalizado."
  },
  {
    icon: BarChart3,
    title: "Analíticas e IA",
    description: "Obtén insights valiosos y optimiza tu negocio con recomendaciones basadas en datos."
  },
  {
    icon: Package,
    title: "Control de stock",
    description: "Gestiona tu inventario inteligentemente con alertas y pedidos automáticos."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-gastro-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas en una sola plataforma</h2>
          <p className="text-xl text-gastro-text-light max-w-2xl mx-auto">
            GastroIA integra todas las herramientas que tu negocio necesita para optimizar operaciones y mejorar la experiencia del cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-gastro rounded-full p-3 w-fit mb-4">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="text-gastro w-full justify-between group">
                  Ver más 
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
