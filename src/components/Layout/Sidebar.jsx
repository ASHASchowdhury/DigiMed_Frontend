import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Brain, 
  Calendar, 
  Settings, 
  Activity,
  Heart
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/patients/register', icon: UserPlus, label: 'Register Patient' },
    { path: '/ai', icon: Brain, label: 'AI Portal' },
    { path: '/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 z-50 
        ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
            <Activity className="text-white" size={24} />
          </div>
          {isOpen && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DigiMed
            </span>
          )}
        </div>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 my-1 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              ${!isOpen && 'justify-center'}
            `}
          >
            <item.icon size={20} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-red-500 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Healthcare</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;