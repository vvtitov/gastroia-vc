
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <AnimatePresence mode="wait">
          <motion.main 
            className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        {/* Floating Chat Config Button */}
        <motion.div 
          className="fixed bottom-6 right-6 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
        >
          <Link to="/chat">
            <Button 
              className="rounded-full w-12 h-12 p-0 bg-gastro hover:bg-gastro-dark shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              aria-label="Configurar Chatbot"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
