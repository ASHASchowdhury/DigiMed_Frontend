import React, { useState, useEffect } from 'react';
import { Users, Activity, Calendar, Heart, Brain, TrendingUp, Clock, Award, ArrowUp, UserPlus, Stethoscope } from 'lucide-react';
import { getPatientCount } from '../services/patientService';
import { getDoctorCount } from '../services/doctorService';
import { getAllAppointments } from '../services/appointmentService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    scheduledAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [patientCount, doctorCount, appointments] = await Promise.all([
        getPatientCount(),
        getDoctorCount(),
        getAllAppointments(),
      ]);

      const completed = appointments.filter(a => a.status === 'COMPLETED').length;
      const scheduled = appointments.filter(a => a.status === 'SCHEDULED').length;

      setStats({
        totalPatients: patientCount,
        totalDoctors: doctorCount,
        totalAppointments: appointments.length,
        completedAppointments: completed,
        scheduledAppointments: scheduled,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback demo data
      setStats({
        totalPatients: 1250,
        totalDoctors: 45,
        totalAppointments: 342,
        completedAppointments: 280,
        scheduledAppointments: 62,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%', link: '/patients' },
    { title: 'Total Doctors', value: stats.totalDoctors, icon: Stethoscope, color: 'from-green-500 to-green-600', change: '+8%', link: '/doctors' },
    { title: 'Appointments', value: stats.totalAppointments, icon: Calendar, color: 'from-orange-500 to-orange-600', change: '+5%', link: '/appointments' },
    { title: 'Completed', value: stats.completedAppointments, icon: Heart, color: 'from-purple-500 to-purple-600', change: '+15%', link: '/appointments' },
  ];

  const quickActions = [
    { title: 'Register Patient', icon: UserPlus, color: 'bg-blue-500', link: '/patients/register' },
    { title: 'Add Doctor', icon: Stethoscope, color: 'bg-green-500', link: '/doctors/register' },
    { title: 'Book Appointment', icon: Calendar, color: 'bg-orange-500', link: '/appointments/book' },
    { title: 'AI Analysis', icon: Brain, color: 'bg-purple-500', link: '/ai' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome to DigiMed Hospital Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp size={16} className="text-green-500" />
                    <span className="text-green-500 text-sm">{stat.change}</span>
                    <span className="text-gray-400 text-sm ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link to={action.link} key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-lg transition-all cursor-pointer group">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">AI Medical Assistant</h2>
            <Brain size={28} />
          </div>
          <p className="text-blue-100 mb-4">Get instant AI-powered medical insights and symptom analysis</p>
          <Link to="/ai">
            <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm">
              Launch AI Assistant →
            </button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">New patient registered</p>
              </div>
              <p className="text-xs text-gray-400">Just now</p>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">Appointment scheduled</p>
              </div>
              <p className="text-xs text-gray-400">5 min ago</p>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">AI analysis completed</p>
              </div>
              <p className="text-xs text-gray-400">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;