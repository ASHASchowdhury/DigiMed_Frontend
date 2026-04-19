import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientDetails = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-600">
        <ArrowLeft size={20} /> Back to Patients
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
        <p className="text-center text-gray-500">Patient details will appear here</p>
      </div>
    </div>
  );
};

export default PatientDetails;
