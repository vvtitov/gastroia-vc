
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Cashier from "./pages/Cashier";
import Stock from "./pages/Stock";
import Chat from "./pages/Chat";
import Employees from "./pages/Employees";
import Analytics from "./pages/Analytics";
import Kitchen from "./pages/Kitchen";
import Business from "./pages/Business";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Messages from "./pages/Messages";
import MarketPlace from "./pages/MarketPlace";
import Products from "./pages/Products";
import Demo from "./pages/Demo";

const queryClient = new QueryClient();

// Custom Route Wrapper que verifica si es una ruta de demostración
const DemoWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDemo = location.search.includes('demo=true');
  
  if (isDemo) {
    return <>{children}</>;
  }
  
  return <AuthGuard>{children}</AuthGuard>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Ruta pública para la demo */}
            <Route path="/demo" element={<Demo />} />
            
            <Route 
              path="/dashboard" 
              element={
                <DemoWrapper>
                  <Dashboard />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <DemoWrapper>
                  <Orders />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/cashier" 
              element={
                <DemoWrapper>
                  <Cashier />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/stock" 
              element={
                <DemoWrapper>
                  <Stock />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <DemoWrapper>
                  <Chat />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/employees" 
              element={
                <DemoWrapper>
                  <Employees />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <DemoWrapper>
                  <Analytics />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/kitchen" 
              element={
                <DemoWrapper>
                  <Kitchen />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/business" 
              element={
                <DemoWrapper>
                  <Business />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <DemoWrapper>
                  <Settings />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/messages" 
              element={
                <DemoWrapper>
                  <Messages />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                <DemoWrapper>
                  <MarketPlace />
                </DemoWrapper>
              } 
            />
            <Route 
              path="/products" 
              element={
                <DemoWrapper>
                  <Products />
                </DemoWrapper>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
