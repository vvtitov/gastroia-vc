
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
  LogOut 
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/orders", icon: <ShoppingCart size={20} />, label: "Pedidos" },
    { to: "/stock", icon: <PackageOpen size={20} />, label: "Inventario" },
    { to: "/employees", icon: <Users size={20} />, label: "Empleados" },
    { to: "/kitchen", icon: <ChefHat size={20} />, label: "Cocina" },
    { to: "/chat", icon: <MessageSquare size={20} />, label: "Chatbot" },
    { to: "/analytics", icon: <BarChart3 size={20} />, label: "Estadísticas" },
    { to: "/business", icon: <Store size={20} />, label: "Mi Negocio" },
    { to: "/settings", icon: <Settings size={20} />, label: "Configuración" },
  ];

  return (
    <aside className="w-64 bg-sidebar hidden md:flex flex-col h-screen">
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
          />
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-accent">
        <SidebarLink
          to="/logout"
          icon={<LogOut size={20} />}
          label="Cerrar sesión"
          isActive={false}
        />
      </div>
    </aside>
  );
};
