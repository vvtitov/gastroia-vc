
import React from "react";
import { Check } from "lucide-react";

const benefitsList = [
  {
    title: "Ahorra tiempo",
    description: "Automatiza tareas repetitivas y reduce el tiempo de gestión administrativa en más de un 70%."
  },
  {
    title: "Reduce errores",
    description: "Minimiza los errores humanos en pedidos y gestión de inventario gracias a la automatización."
  },
  {
    title: "Mejora la satisfacción",
    description: "Aumenta la satisfacción de tus clientes con una atención rápida y personalizada."
  },
  {
    title: "Optimiza costos",
    description: "Reduce costos operativos identificando ineficiencias y controlando mejor tu inventario."
  },
  {
    title: "Datos en tiempo real",
    description: "Accede a estadísticas e informes en tiempo real para tomar decisiones informadas."
  },
  {
    title: "Escalabilidad",
    description: "Adapta el sistema a tus necesidades a medida que tu negocio crece y evoluciona."
  }
];

const Benefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Beneficios que transformarán tu negocio</h2>
          <p className="text-xl text-gastro-text-light max-w-2xl mx-auto">
            Descubre cómo GastroIA puede ayudarte a mejorar todas las áreas de tu establecimiento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((benefit, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gastro-text-light">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
