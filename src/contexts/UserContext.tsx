import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
  _id: string;
  email: string;
  username?: string;
  authProvider: 'local' | 'google';
  phone_num?: string;
  dob?: Date;
  country?: string;
  height?: number;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Export the context type for consumers who need it
export type { UserContextType };

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  

  // Memoize checkAuth to prevent unnecessary re-renders
  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/userDetails`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it only uses external API_BASE_URL

  // Memoize login function
  const login = useCallback((userData: User): void => {
    setUser(userData);
  }, []);

  // Memoize logout function
  const logout = useCallback((): void => {
    setUser(null);
  }, []);

  // Run checkAuth only on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Include checkAuth in dependencies

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<UserContextType>(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  }), [user, loading, login, logout, checkAuth]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};  
