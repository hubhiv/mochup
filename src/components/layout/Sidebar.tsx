import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Users, Settings, BarChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
export const Sidebar: React.FC = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  const getLinkClass = (path: string) => {
    return `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive(path) ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-foreground'}`;
  };
  // Navigation links based on user role
  const renderNavLinks = () => {
    if (user?.role === 'customer') {
      return <>
          <li>
            <Link to="/customer/dashboard" className={getLinkClass('/customer/dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/customer/boards" className={getLinkClass('/customer/boards')}>
              <ClipboardList size={18} />
              <span>My Boards</span>
            </Link>
          </li>
        </>;
    } else if (user?.role === 'provider') {
      return <>
          <li>
            <Link to="/provider/dashboard" className={getLinkClass('/provider/dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/provider/listings" className={getLinkClass('/provider/listings')}>
              <ClipboardList size={18} />
              <span>My Listings</span>
            </Link>
          </li>
        </>;
    } else if (user?.role === 'admin') {
      return <>
          <li>
            <Link to="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/panel" className={getLinkClass('/admin/panel')}>
              <Settings size={18} />
              <span>Admin Panel</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={getLinkClass('/admin/users')}>
              <Users size={18} />
              <span>User Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics" className={getLinkClass('/admin/analytics')}>
              <BarChart size={18} />
              <span>Analytics</span>
            </Link>
          </li>
        </>;
    }
    return null;
  };
  return <aside className="w-64 border-r border-border hidden md:block p-4">
      <nav>
        <ul className="space-y-2">{renderNavLinks()}</ul>
      </nav>
    </aside>;
};