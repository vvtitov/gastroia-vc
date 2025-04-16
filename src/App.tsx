
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

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
            
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <AuthGuard>
                  <Orders />
                </AuthGuard>
              } 
            />
            <Route 
              path="/cashier" 
              element={
                <AuthGuard>
                  <Cashier />
                </AuthGuard>
              } 
            />
            <Route 
              path="/stock" 
              element={
                <AuthGuard>
                  <Stock />
                </AuthGuard>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <AuthGuard>
                  <Chat />
                </AuthGuard>
              } 
            />
            <Route 
              path="/employees" 
              element={
                <AuthGuard>
                  <Employees />
                </AuthGuard>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <AuthGuard>
                  <Analytics />
                </AuthGuard>
              } 
            />
            <Route 
              path="/kitchen" 
              element={
                <AuthGuard>
                  <Kitchen />
                </AuthGuard>
              } 
            />
            <Route 
              path="/business" 
              element={
                <AuthGuard>
                  <Business />
                </AuthGuard>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } 
            />
            <Route 
              path="/messages" 
              element={
                <AuthGuard>
                  <Messages />
                </AuthGuard>
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                <AuthGuard>
                  <MarketPlace />
                </AuthGuard>
              } 
            />
            <Route 
              path="/products" 
              element={
                <AuthGuard>
                  <Products />
                </AuthGuard>
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
