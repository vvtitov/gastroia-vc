
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
      <div className="space-y-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
          Inteligencia artificial para tu negocio gastronómico
        </h1>
        <p className="text-xl text-white/80 leading-relaxed">
          Automatiza procesos, mejora la experiencia de tus clientes y optimiza la gestión de tu restaurante o bar con IA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/auth/register">
            <Button size="lg" className="bg-white text-gastro hover:bg-white/90 w-full sm:w-auto">
              Comenzar gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="dropdown">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 w-full sm:w-auto bg-blue-500 dropdown-toggle"
              onClick={() => document.getElementById('demo-dropdown')?.classList.toggle('hidden')}
            >
              Ver demo
            </Button>
            <div id="demo-dropdown" className="hidden absolute mt-2 w-auto bg-white rounded-md shadow-lg z-10">
              <Link to="/dashboard?demo=true&type=business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Demo Negocio
              </Link>
              <Link to="/dashboard?demo=true&type=provider" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Demo Proveedor
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:justify-self-end max-w-xl w-full">
        <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="bg-gastro-bg p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gastro rounded-full p-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-medium">GastroBot</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-gastro-text mb-3 shadow-sm">
              Hola, bienvenido a La Trattoria. ¿En qué puedo ayudarte hoy?
            </div>
            <div className="bg-gastro float-right text-white p-3 rounded-lg mb-3 max-w-[80%] shadow-sm">
              Me gustaría ver el menú
            </div>
            <div className="clear-both"></div>
            <div className="bg-white p-3 rounded-lg text-gastro-text shadow-sm">
              ¡Por supuesto! Aquí tienes nuestro menú de hoy. Te recomiendo especialmente la pasta del día y el tiramisú para postre.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
