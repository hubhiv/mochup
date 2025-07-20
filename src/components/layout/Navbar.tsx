import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
export const Navbar: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              Blooming Happy Living
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user && <div className="flex items-center">
              <div className="mr-4">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Logout">
                <LogOut size={18} />
              </button>
            </div>}
        </div>
      </div>
    </header>;
};