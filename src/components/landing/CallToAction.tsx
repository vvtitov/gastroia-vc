
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gastro to-gastro-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
          Únete a los cientos de negocios que están optimizando sus operaciones con GastroIA.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/auth/register">
            <Button 
              size="lg" 
              className="bg-white text-gastro hover:bg-white/90 w-full sm:w-auto"
            >
              Comenzar ahora
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white bg-primary hover:bg-white/20 w-full sm:w-auto"
          >
            Contactar ventas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
