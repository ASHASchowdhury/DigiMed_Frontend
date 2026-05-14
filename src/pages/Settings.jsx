import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="text-gray-600" /> Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your application preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
        {/* Appearance */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={24} className="text-purple-600" /> : <Sun size={24} className="text-yellow-500" />}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-500">Toggle dark/light theme</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={24} className="text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-500">Receive email notifications</p>
              </div>
            </div>
            <button className="w-12 h-6 rounded-full bg-gray-300">
              <div className="w-5 h-5 rounded-full bg-white transform translate-x-1" />
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-gray-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Security</h3>
              <p className="text-sm text-gray-500">Manage your security preferences</p>
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700">
            Change Password →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;