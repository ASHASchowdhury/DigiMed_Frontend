import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import toast from 'react-hot-toast';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
          </button>

          <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user?.fullName || 'Guest'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase() || 'User'}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;