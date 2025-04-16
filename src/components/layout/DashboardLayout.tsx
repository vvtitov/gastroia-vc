
import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <TopNavbar />
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
        
        {/* Floating Chat Config Button */}
        <div className="fixed bottom-6 right-6">
          <Link to="/chat">
            <Button 
              className="rounded-full w-12 h-12 p-0 bg-gastro hover:bg-gastro-dark shadow-lg"
              aria-label="Configurar Chatbot"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
