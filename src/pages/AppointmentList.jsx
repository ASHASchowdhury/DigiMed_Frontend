import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAppointments, cancelAppointment, completeAppointment } from '../services/appointmentService';
import { Calendar, Clock, User, Stethoscope, X, CheckCircle, Loader, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeAppointment(id);
      toast.success('Appointment marked as completed');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const filteredAppointments = appointments.filter(app => 
    filter === 'ALL' || app.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-700';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" size={40} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="text-orange-600" /> Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all hospital appointments</p>
        </div>
        <Link to="/appointments/book">
          <button className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition">
            <Plus size={20} /> Book Appointment
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'SCHEDULED', 'COMPLETED', 'CANCELLED'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === status 
                ? 'bg-orange-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No appointments found</p>
          <Link to="/appointments/book" className="text-orange-600 mt-2 inline-block">
            Book your first appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{apt.patientName}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                      <Stethoscope size={14} /> Dr. {apt.doctorName} • {apt.specialization}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <p className="flex items-center gap-1"><Calendar size={14} /> {apt.appointmentDate}</p>
                      <p className="flex items-center gap-1"><Clock size={14} /> {apt.appointmentTime}</p>
                    </div>
                    {apt.symptoms && (
                      <p className="mt-2 text-sm text-gray-500"><span className="font-medium">Symptoms:</span> {apt.symptoms}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  {apt.status === 'SCHEDULED' && (
                    <>
                      <button
                        onClick={() => handleComplete(apt.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <CheckCircle size={16} /> Complete
                      </button>
                      <button
                        onClick={() => handleCancel(apt.id)}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition flex items-center gap-2"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;