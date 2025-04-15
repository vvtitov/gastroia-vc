
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, ChevronRight, Utensils, MessageSquare, BarChart3, Package, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gastro text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-md p-1.5">
                <Bot className="h-5 w-5 text-gastro" />
              </div>
              <span className="font-bold text-xl">GastroIA</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link to="/auth/login" className="hover:underline text-sm lg:text-base">Iniciar sesión</Link>
              <Link to="/auth/register">
                <Button variant="ghost" className="hover:bg-gastro-light">
                  Registrarse
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Inteligencia artificial para tu negocio gastronómico
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-white/80">
              Automatiza procesos, mejora la experiencia de tus clientes y optimiza la gestión de tu restaurante o bar con IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button className="bg-white text-gastro hover:bg-white/90 w-full sm:w-auto shadow-lg">
                  Comenzar gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="border-white hover:bg-gastro-light w-full sm:w-auto">
                Ver demo
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-white rounded-xl shadow-xl p-4 max-w-md">
              <div className="bg-gastro-bg p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gastro rounded-full p-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm font-medium">GastroBot</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-gastro-text mb-3">
                  Hola, bienvenido a La Trattoria. ¿En qué puedo ayudarte hoy?
                </div>
                <div className="bg-gastro float-right text-white p-3 rounded-lg mb-3 max-w-[80%]">
                  Me gustaría ver el menú
                </div>
                <div className="clear-both"></div>
                <div className="bg-white p-3 rounded-lg text-gastro-text">
                  ¡Por supuesto! Aquí tienes nuestro menú de hoy. Te recomiendo especialmente la pasta del día y el tiramisú para postre.
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gastro-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas en una sola plataforma</h2>
            <p className="text-xl text-gastro-text-light max-w-2xl mx-auto">
              GastroIA integra todas las herramientas que tu negocio necesita para optimizar operaciones y mejorar la experiencia del cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 bg-gastro-bg rounded-md w-fit mb-4">
                  <Utensils className="h-5 w-5 text-gastro" />
                </div>
                <CardTitle>Gestión de pedidos</CardTitle>
                <CardDescription>
                  Automatiza la toma de pedidos y mejora la comunicación entre sala y cocina.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="text-gastro w-full justify-between group">
                  Ver más 
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 bg-gastro-bg rounded-md w-fit mb-4">
                  <MessageSquare className="h-5 w-5 text-gastro" />
                </div>
                <CardTitle>Chatbot IA</CardTitle>
                <CardDescription>
                  Atiende a tus clientes 24/7 con un asistente virtual inteligente y personalizado.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="text-gastro w-full justify-between group">
                  Ver más 
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 bg-gastro-bg rounded-md w-fit mb-4">
                  <BarChart3 className="h-5 w-5 text-gastro" />
                </div>
                <CardTitle>Analíticas e IA</CardTitle>
                <CardDescription>
                  Obtén insights valiosos y optimiza tu negocio con recomendaciones basadas en datos.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="text-gastro w-full justify-between group">
                  Ver más 
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 bg-gastro-bg rounded-md w-fit mb-4">
                  <Package className="h-5 w-5 text-gastro" />
                </div>
                <CardTitle>Control de stock</CardTitle>
                <CardDescription>
                  Gestiona tu inventario inteligentemente con alertas y pedidos automáticos.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="text-gastro w-full justify-between group">
                  Ver más 
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gastro text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
            Únete a los cientos de negocios que ya están optimizando sus operaciones con GastroIA.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/register">
              <Button className="bg-white text-gastro hover:bg-white/90">
                Comenzar ahora
              </Button>
            </Link>
            <Button variant="outline" className="border-white hover:bg-gastro-light">
              Contactar ventas
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gastro-text text-white/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-medium text-white mb-4">Producto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Características</a></li>
                <li><a href="#" className="hover:text-white">Precios</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Compañía</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white">Clientes</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentación</a></li>
                <li><a href="#" className="hover:text-white">Guías</a></li>
                <li><a href="#" className="hover:text-white">Soporte</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-white rounded-md p-1.5">
                <Bot className="h-4 w-4 text-gastro" />
              </div>
              <span className="font-medium">GastroIA</span>
            </div>
            <div className="text-sm">
              © 2025 GastroIA. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
