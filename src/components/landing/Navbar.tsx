
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
