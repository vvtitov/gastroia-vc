
import React from "react";
import { Bot } from "lucide-react";

const footerLinks = {
  Producto: ["Características", "Precios", "Demo"],
  Compañía: ["Sobre nosotros", "Clientes", "Blog"],
  Recursos: ["Documentación", "Guías", "Soporte"],
  Legal: ["Términos", "Privacidad", "Cookies"]
};

const Footer = () => {
  return (
    <footer className="py-16 bg-gastro-text text-white/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-white text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
  );
};

export default Footer;
