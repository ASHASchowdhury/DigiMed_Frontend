import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPatients, deletePatient } from '../../services/patientService';
import { Search, User, Eye, Trash2, Plus, Users } from 'lucide-react';
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
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete patient ${name}?`)) {
      try {
        await deletePatient(id);
        toast.success('Patient deleted');
        fetchPatients();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all registered patients</p>
        </div>
        <Link to="/patients/register">
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition">
            <Plus size={20} />
            Add Patient
          </button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading patients...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{patient.fullName}</h3>
                    <p className="text-sm text-indigo-100">{patient.registrationNumber}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p><span className="text-gray-500">Age/Gender:</span> {patient.age}/{patient.gender}</p>
                <p><span className="text-gray-500">Phone:</span> {patient.phoneNumber}</p>
                <p><span className="text-gray-500">City:</span> {patient.city}</p>
              </div>
              <div className="border-t p-4 flex justify-between">
                <Link to={`/patients/${patient.id}`} className="flex items-center gap-2 text-indigo-600">
                  <Eye size={18} /> View
                </Link>
                <button onClick={() => handleDelete(patient.id, patient.fullName)} className="text-red-600">
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