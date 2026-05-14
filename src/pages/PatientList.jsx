import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPatients, deletePatient } from '../services/patientService';
import { Search, User, Eye, Trash2, Plus, Loader, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Failed to load patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete patient ${name}? This action cannot be undone.`)) {
      try {
        await deletePatient(id);
        toast.success('Patient deleted successfully');
        fetchPatients();
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete patient');
      }
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber?.includes(searchTerm)
  );

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all registered patients</p>
        </div>
        <Link to="/patients/register">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition">
            <Plus size={20} />
            Add Patient
          </button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search patients by name, registration number, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {filteredPatients.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No patients found</p>
          <Link to="/patients/register" className="text-blue-600 mt-2 inline-block">
            Register your first patient
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{patient.fullName}</h3>
                    <p className="text-sm text-blue-100">{patient.registrationNumber}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Age/Gender:</span> 
                  <span>{patient.age} / {patient.gender}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <span>{patient.phoneNumber}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{patient.city}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Status:</span> 
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {patient.status}
                  </span>
                </p>
              </div>
              <div className="border-t p-4 flex justify-between">
                <Link to={`/patients/${patient.id}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Eye size={18} /> View Details
                </Link>
                <button onClick={() => handleDelete(patient.id, patient.fullName)} className="text-red-600 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;