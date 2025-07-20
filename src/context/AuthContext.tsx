import React, { useEffect, useState, createContext, useContext } from 'react';
type UserRole = 'customer' | 'provider' | 'admin';
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if user is stored in localStorage (this is just for demo purposes)
    const storedUser = localStorage.getItem('bhl_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we're creating mock users
    const mockUsers = {
      'customer@example.com': {
        id: '1',
        name: 'Customer User',
        email: 'customer@example.com',
        role: 'customer' as UserRole
      },
      'provider@example.com': {
        id: '2',
        name: 'Provider User',
        email: 'provider@example.com',
        role: 'provider' as UserRole
      },
      'admin@example.com': {
        id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as UserRole
      }
    };
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers[email as keyof typeof mockUsers];
        if (user && password === 'password') {
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('bhl_user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  const register = async (email: string, password: string, role: UserRole) => {
    // In a real app, this would make an API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          role
        };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('bhl_user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bhl_user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};