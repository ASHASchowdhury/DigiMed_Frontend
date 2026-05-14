import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById } from '../services/patientService';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Heart, Droplet, Activity, Loader } from 'lucide-react';
import toast from 'react-hot-toast';


const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const data = await getPatientById(id);
      setPatient(data);
    } catch (error) {
      toast.error('Patient not found');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="animate-spin" size={40} color="#3b82f6" />
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={() => navigate('/patients')} 
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
      >
        <ArrowLeft size={20} /> Back to Patients
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{patient.fullName}</h1>
              <p className="text-blue-100">Registration ID: {patient.registrationNumber}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                patient.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {patient.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <User size={20} className="text-blue-600" /> Personal Information
            </h2>
            <div className="space-y-3">
              <p><span className="font-medium text-gray-600 dark:text-gray-400">Full Name:</span> {patient.fullName}</p>
              <p><span className="font-medium text-gray-600 dark:text-gray-400">Age:</span> {patient.age} years</p>
              <p><span className="font-medium text-gray-600 dark:text-gray-400">Gender:</span> {patient.gender}</p>
              <p><span className="font-medium text-gray-600 dark:text-gray-400">Blood Group:</span> {patient.bloodGroup || 'Not specified'}</p>
              <p><span className="font-medium text-gray-600 dark:text-gray-400">Date of Birth:</span> {patient.dateOfBirth}</p>
            </div>
          </div>

        {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-

center gap-2 text-gray-900 dark:text-white">
              <Phone size={20} className="text-blue-600" /> Contact Information
            </h2>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span className="font-medium">Phone:</span> {patient.phoneNumber}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span className="font-medium">Email:</span> {patient.email || 'Not provided'}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="font-medium">City:</span> {patient.city}
              </p>
              <p className="flex items-center gap-2">
                <Activity size={16} className="text-gray-400" />
                <span className="font-medium">Registration Date:</span> {new Date(patient.registrationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;