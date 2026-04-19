import React from 'react';
import { Users, Activity, Calendar, Heart, Brain } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Patients', value: '892', icon: Heart, color: 'from-green-500 to-green-600' },
    { title: 'AI Assessments', value: '156', icon: Brain, color: 'from-purple-500 to-purple-600' },
    { title: 'Appointments', value: '24', icon: Calendar, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome to DigiMed Hospital Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
