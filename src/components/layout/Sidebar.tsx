
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PackageOpen, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Store, 
  ChefHat, 
  LogOut,
  CreditCard,
  ShoppingBag,
  Layers,
  Utensils
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  setOpen?: (open: boolean) => void;
  isDemo?: boolean;
  demoType?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, setOpen, isDemo, demoType }) => {
  // Si estamos en modo demo, asegúrate de que la URL mantiene los parámetros de demo
  const linkTo = isDemo 
    ? to === "/dashboard" 
      ? `/demo?type=${demoType || 'business'}` 
      : `${to}?demo=true&type=${demoType || 'business'}`
    : to;

  return (
    <Link
      to={linkTo}
      className={cn(
        "flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768 && typeof setOpen === 'function') setOpen(false);
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-3">
      <div className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
        {title}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, signOut } = useAuth();
  const [userType, setUserType] = useState<string>('business');
  const [isDemo, setIsDemo] = useState(false);
  const [demoType, setDemoType] = useState<string>('business');

  useEffect(() => {
    // Check if we're in the demo page or using demo parameters
    const isDemoPage = pathname === '/demo';
    const urlParams = new URLSearchParams(location.search);
    const demo = urlParams.get('demo');
    
    if (isDemoPage || demo === 'true') {
      setIsDemo(true);
      const type = urlParams.get('type');
      setDemoType(type || 'business');
      setUserType(type || 'business');
      return;
    }

    // Si no es demo, usamos el tipo de usuario normal
    setIsDemo(false);
    setUserType('business'); // Default value, should be updated with user data
  }, [location.search, pathname, user]);

  // Determine if a link is active
  const isLinkActive = (path: string) => {
    if (pathname === '/demo' && path === '/dashboard') {
      return true;
    }
    return pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${open ? 'block md:hidden' : 'hidden'}`}
        onClick={() => setOpen && setOpen(false)}
        aria-hidden={!open}
      />

      {/* Sidebar */}
      <motion.aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-sidebar transform transition-all duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:flex md:translate-x-0 ${open ? '' : 'hidden'} md:block`}
        onClick={e => e.stopPropagation()}
        initial={false}
        animate={{ 
          x: typeof window !== 'undefined' && window.innerWidth < 768 
            ? (open ? 0 : -320) 
            : 0 
        }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white">
              <span className="text-gastro font-bold text-lg">G</span>
            </div>
            <h1 className="text-white font-bold text-xl">GastroIA</h1>
          </div>
        </div>

        <nav className="flex-1 p-2 overflow-y-auto space-y-1">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isActive={isLinkActive("/dashboard")}
            setOpen={setOpen}
            isDemo={isDemo}
            demoType={demoType}
          />

          {userType === 'business' && (
            <>
              <SidebarSection title="Operaciones">
                <SidebarLink
                  to="/cashier"
                  icon={<CreditCard size={20} />}
                  label="Caja y Salón"
                  isActive={isLinkActive("/cashier")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/orders"
                  icon={<ShoppingCart size={20} />}
                  label="Pedidos"
                  isActive={isLinkActive("/orders")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/kitchen"
                  icon={<ChefHat size={20} />}
                  label="Cocina"
                  isActive={isLinkActive("/kitchen")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
              </SidebarSection>

              <SidebarSection title="Gestión">
                <SidebarLink
                  to="/stock"
                  icon={<PackageOpen size={20} />}
                  label="Inventario"
                  isActive={isLinkActive("/stock")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/employees"
                  icon={<Users size={20} />}
                  label="Empleados"
                  isActive={isLinkActive("/employees")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/marketplace"
                  icon={<ShoppingBag size={20} />}
                  label="Marketplace"
                  isActive={isLinkActive("/marketplace")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/business"
                  icon={<Store size={20} />}
                  label="Mi Negocio"
                  isActive={isLinkActive("/business")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
              </SidebarSection>
            </>
          )}

          {userType === 'provider' && (
            <>
              <SidebarSection title="Gestión">
                <SidebarLink
                  to="/orders"
                  icon={<ShoppingCart size={20} />}
                  label="Pedidos"
                  isActive={isLinkActive("/orders")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/products"
                  icon={<PackageOpen size={20} />}
                  label="Productos"
                  isActive={isLinkActive("/products")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
                <SidebarLink
                  to="/business"
                  icon={<Store size={20} />}
                  label="Mi Empresa"
                  isActive={isLinkActive("/business")}
                  setOpen={setOpen}
                  isDemo={isDemo}
                  demoType={demoType}
                />
              </SidebarSection>
            </>
          )}

          <SidebarSection title="Comunicación">
            <SidebarLink
              to="/messages"
              icon={<MessageSquare size={20} />}
              label="Mensajes"
              isActive={isLinkActive("/messages")}
              setOpen={setOpen}
              isDemo={isDemo}
              demoType={demoType}
            />
            <SidebarLink
              to="/chat"
              icon={<Utensils size={20} />}
              label="Chatbot"
              isActive={isLinkActive("/chat")}
              setOpen={setOpen}
              isDemo={isDemo}
              demoType={demoType}
            />
          </SidebarSection>

          <SidebarSection title="Análisis">
            <SidebarLink
              to="/analytics"
              icon={<BarChart3 size={20} />}
              label="Estadísticas"
              isActive={isLinkActive("/analytics")}
              setOpen={setOpen}
              isDemo={isDemo}
              demoType={demoType}
            />
            <SidebarLink
              to="/settings"
              icon={<Settings size={20} />}
              label="Configuración"
              isActive={isLinkActive("/settings")}
              setOpen={setOpen}
              isDemo={isDemo}
              demoType={demoType}
            />
          </SidebarSection>
        </nav>

        <div className="p-4 border-t border-sidebar-accent">
          {isDemo ? (
            <Link to="/">
              <button
                className="flex w-full items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <LogOut size={20} />
                <span>Salir del Demo</span>
              </button>
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
};
