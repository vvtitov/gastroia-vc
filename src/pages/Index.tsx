import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, ChevronRight, Utensils, MessageSquare, BarChart3, Package, Users, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-gastro to-gastro-dark min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1.5">
                <Bot className="h-5 w-5 text-gastro" />
              </div>
              <span className="font-bold text-xl text-white">GastroIA</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link to="/auth/login" className="text-white hover:text-white/90 text-sm lg:text-base">
                Iniciar sesión
              </Link>
              <Link to="/auth/register">
                <Button variant="secondary" className="bg-white text-gastro hover:bg-white/90">
                  Registrarse
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex-1 container mx-auto px-4 flex items-center">
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
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
                >
                  Ver demo
                </Button>
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
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-gastro-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas en una sola plataforma</h2>
            <p className="text-xl text-gastro-text-light max-w-2xl mx-auto">
              GastroIA integra todas las herramientas que tu negocio necesita para optimizar operaciones y mejorar la experiencia del cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-gastro rounded-full p-3 w-fit mb-4">
                  <Utensils className="h-5 w-5 text-white" />
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
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-gastro rounded-full p-3 w-fit mb-4">
                  <MessageSquare className="h-5 w-5 text-white" />
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
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-gastro rounded-full p-3 w-fit mb-4">
                  <BarChart3 className="h-5 w-5 text-white" />
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
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-gastro rounded-full p-3 w-fit mb-4">
                  <Package className="h-5 w-5 text-white" />
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
      
      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Beneficios que transformarán tu negocio</h2>
            <p className="text-xl text-gastro-text-light max-w-2xl mx-auto">
              Descubre cómo GastroIA puede ayudarte a mejorar todas las áreas de tu establecimiento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ahorra tiempo</h3>
                <p className="text-gastro-text-light">Automatiza tareas repetitivas y reduce el tiempo de gestión administrativa en más de un 70%.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce errores</h3>
                <p className="text-gastro-text-light">Minimiza los errores humanos en pedidos y gestión de inventario gracias a la automatización.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mejora la satisfacción</h3>
                <p className="text-gastro-text-light">Aumenta la satisfacción de tus clientes con una atención rápida y personalizada.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimiza costos</h3>
                <p className="text-gastro-text-light">Reduce costos operativos identificando ineficiencias y controlando mejor tu inventario.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Datos en tiempo real</h3>
                <p className="text-gastro-text-light">Accede a estadísticas e informes en tiempo real para tomar decisiones informadas.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-gastro-bg rounded-full p-2 mt-1">
                <Check className="h-5 w-5 text-gastro" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Escalabilidad</h3>
                <p className="text-gastro-text-light">Adapta el sistema a tus necesidades a medida que tu negocio crece y evoluciona.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
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
              className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
            >
              Contactar ventas
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-gastro-text text-white/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-medium text-white text-lg mb-4">Producto</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white text-lg mb-4">Compañía</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clientes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white text-lg mb-4">Recursos</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guías</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-white rounded-full p-1.5">
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
