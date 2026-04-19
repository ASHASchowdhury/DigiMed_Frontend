import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById } from '../../services/patientService';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!patient) return <div className="text-center py-10">Patient not found</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} /> Back to Patients
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{patient.fullName}</h1>
              <p>ID: {patient.registrationNumber}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} className="text-indigo-600" /> Personal Information
            </h2>
            <div className="space-y-2">
              <p><span className="font-medium">Full Name:</span> {patient.fullName}</p>
              <p><span className="font-medium">Age:</span> {patient.age} years</p>
              <p><span className="font-medium">Gender:</span> {patient.gender}</p>
              <p><span className="font-medium">Blood Group:</span> {patient.bloodGroup || 'Not specified'}</p>
              <p><span className="font-medium">Status:</span> {patient.status}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone size={20} className="text-indigo-600" /> Contact Information
            </h2>
            <div className="space-y-2">
              <p><span className="font-medium">Phone:</span> {patient.phoneNumber}</p>
              <p><span className="font-medium">Email:</span> {patient.email || 'Not provided'}</p>
              <p><span className="font-medium">City:</span> {patient.city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;