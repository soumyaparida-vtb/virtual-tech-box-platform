// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('vtb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('vtb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vtb_user');
    }
  }, [user]);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('vtb_user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};