import React from 'react';
import { Users, Activity, Calendar, Heart, Brain, TrendingUp, Clock, Award } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: 'Active Patients', value: '892', icon: Heart, color: 'from-green-500 to-green-600', change: '+8%' },
    { title: 'AI Assessments', value: '156', icon: Brain, color: 'from-purple-500 to-purple-600', change: '+23%' },
    { title: 'Appointments', value: '24', icon: Calendar, color: 'from-orange-500 to-orange-600', change: '+5%' },
  ];

  const recentActivities = [
    { id: 1, patient: 'John Doe', action: 'Registered', time: '5 minutes ago', status: 'success' },
    { id: 2, patient: 'Jane Smith', action: 'AI Analysis', time: '1 hour ago', status: 'info' },
    { id: 3, patient: 'Robert Johnson', action: 'Appointment', time: '3 hours ago', status: 'warning' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your hospital overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <p className="text-green-500 text-sm mt-2">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.patient}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">AI Insights</h2>
            <Brain size={24} />
          </div>
          <p className="text-indigo-100 mb-4">Based on recent patient data analysis:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="text-sm">Patient satisfaction increased by 15%</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span className="text-sm">AI diagnosis accuracy at 94.5%</span>
            </div>
          </div>
          <button className="mt-6 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;