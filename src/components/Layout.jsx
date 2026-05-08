import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;