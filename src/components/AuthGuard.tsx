
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if this is a demo route
  const isDemoRoute = location.pathname === '/demo';
  const urlParams = new URLSearchParams(location.search);
  const isDemo = urlParams.get('demo') === 'true';
  
  // If it's a demo, we don't need to redirect
  useEffect(() => {
    // If it's a demo route or has demo=true param, we don't need to redirect
    if (isDemoRoute || isDemo) return;
    
    // Otherwise check for authentication
    if (!loading && !user) {
      navigate('/auth/login', { state: { from: location }, replace: true });
    }
  }, [user, loading, location, navigate, isDemo, isDemoRoute]);

  // If it's a demo route or has demo=true param, render children regardless of authentication
  if (isDemoRoute || isDemo) {
    return <>{children}</>;
  }

  // Regular authentication flow
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div 
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-gastro"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!user) {
    // The navigate in useEffect will handle redirection, but this is a fallback
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
