import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.services';
import type { ReactNode } from 'react';
import type { User } from '../types/Auth';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Cargar usuario del localStorage al iniciar
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};