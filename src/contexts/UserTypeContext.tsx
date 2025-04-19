
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

type UserType = 'business' | 'provider';

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export const UserTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('business');
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      // If we're in demo mode, let the demo type override the user type
      const urlParams = new URLSearchParams(location.search);
      const isDemo = location.pathname === '/demo' || urlParams.get('demo') === 'true';
      const demoType = urlParams.get('type');
      
      if (isDemo && demoType) {
        setUserType(demoType as UserType);
        return;
      }
      
      // If not in demo mode and we have a user, fetch their type from the database
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        if (data?.user_type) {
          setUserType(data.user_type as UserType);
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserProfile();
  }, [user, location.search, location.pathname]);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};
