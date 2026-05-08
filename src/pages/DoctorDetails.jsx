import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById } from '../services/doctorService';
import { ArrowLeft, Stethoscope, Phone, Mail, MapPin, Briefcase, Clock, Award, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const data = await getDoctorById(id);
      setDoctor(data);
    } catch (error) {
      toast.error('Doctor not found');
      navigate('/doctors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="animate-spin" size={40} color="#10b981" />
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
        <ArrowLeft size={20} /> Back to Doctors
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Stethoscope size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{doctor.fullName}</h1>
              <p className="text-green-100">{doctor.specialization}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                doctor.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {doctor.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-green-600" /> Professional Information
            </h2>
            <div className="space-y-3">
              <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
              <p><span className="font-medium">Qualification:</span> {doctor.qualification || 'N/A'}</p>
              <p><span className="font-medium">Experience:</span> {doctor.experience || 'N/A'}</p>
              <p><span className="font-medium">License Number:</span> {doctor.licenseNumber}</p>
              <p><span className="font-medium">Department:</span> {doctor.department || 'General'}</p>
              <p><span className="font-medium">Consultation Fee:</span> {doctor.consultationFee || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone size={20} className="text-green-600" /> Contact Information
            </h2>
            <div className="space-y-3">
              <p className="flex items-center gap-2"><Phone size={16} /> {doctor.phoneNumber}</p>
              <p className="flex items-center gap-2"><Mail size={16} /> {doctor.email || 'Not provided'}</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> {doctor.chamberAddress || 'Not specified'}</p>
              <p className="flex items-center gap-2"><Clock size={16} /> {doctor.availability || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;