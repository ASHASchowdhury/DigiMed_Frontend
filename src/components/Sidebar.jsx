import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  Brain, 
  Settings,
  Menu,
  X,
  Activity,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/doctors', icon: Stethoscope, label: 'Doctors' },
  { path: '/appointments', icon: Calendar, label: 'Appointments' },
  { path: '/ai', icon: Brain, label: 'AI Portal' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        'fixed top-0 left-0 z-30 h-screen transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl',
        sidebarOpen ? 'w-64' : 'w-20',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DigiMed
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:block hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                !sidebarOpen && 'justify-center'
              )}
              title={!sidebarOpen ? item.label : ''}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Footer & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          {sidebarOpen && user && (
            <div className="mb-3 px-2 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm font-medium truncate">{user.fullName}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          )}
          <button
            onClick={logout}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full',
              !sidebarOpen && 'justify-center'
            )}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;