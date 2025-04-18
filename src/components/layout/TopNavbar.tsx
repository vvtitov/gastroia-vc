
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { BusinessSwitcher } from './BusinessSwitcher';

const TopNavbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isDemo = location.search.includes('demo=true');

  return (
    <div className="bg-white border-b py-2 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-gastro-text">GastroIA</h2>
        {user && <BusinessSwitcher />}
      </div>
      <div>
        {isDemo ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-amber-600">Modo Demo</span>
            <Link to="/">
              <Button variant="default" className="bg-gastro text-white hover:bg-gastro-dark">
                Salir del Demo
              </Button>
            </Link>
          </div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              className="bg-gastro text-white hover:bg-gastro-dark"
              onClick={() => window.location.href = 'https://lovable.dev/pricing'}
            >
              Contratar Plan PRO
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Link to="/auth/login">
            <Button variant="default" className="bg-gastro text-white hover:bg-gastro-dark">
              Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
