
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
  CreditCard
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  setOpen?: (open: boolean) => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, setOpen }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
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

interface SidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { signOut } = useAuth();

  const links = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/orders", icon: <ShoppingCart size={20} />, label: "Pedidos" },
    { to: "/cashier", icon: <CreditCard size={20} />, label: "Caja" },
    { to: "/stock", icon: <PackageOpen size={20} />, label: "Inventario" },
    { to: "/employees", icon: <Users size={20} />, label: "Empleados" },
    { to: "/kitchen", icon: <ChefHat size={20} />, label: "Cocina" },
    { to: "/chat", icon: <MessageSquare size={20} />, label: "Chatbot" },
    { to: "/analytics", icon: <BarChart3 size={20} />, label: "Estadísticas" },
    { to: "/business", icon: <Store size={20} />, label: "Mi Negocio" },
    { to: "/settings", icon: <Settings size={20} />, label: "Configuración" },
  ];

  // Drawer para mobile
  return (
    <>
      {/* Drawer en mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? 'block md:hidden' : 'hidden'}`}
        onClick={() => setOpen && setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-sidebar transform transition-transform duration-200 flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:flex md:translate-x-0 ${open ? '' : 'hidden'} md:block`}
        onClick={e => e.stopPropagation()}
      >
      <div className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white">
            <span className="text-gastro font-bold text-lg">G</span>
          </div>
          <h1 className="text-white font-bold text-xl">GastroIA</h1>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {links.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={pathname === link.to}
            setOpen={setOpen}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-accent">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
    </>
  );
};
