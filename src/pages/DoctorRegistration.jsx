import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../services/doctorService';
import { Save, ArrowLeft, Loader, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    qualification: '',
    experience: '',
    licenseNumber: '',
    phoneNumber: '',
    email: '',
    consultationFee: '',
    availability: 'Mon-Fri, 9 AM - 5 PM',
    department: '',
    chamberAddress: '',
    loginEmail: '',
    loginPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerDoctor(formData);
      toast.success('Doctor registered successfully!');
      navigate('/doctors');
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/doctors')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="text-green-600" /> Doctor Registration
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Register a new doctor in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">Professional Information</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
            <input type="text" name="firstName" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
            <input type="text" name="lastName" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialization *</label>
            <input type="text" name="specialization" required onChange={handleChange} placeholder="Cardiology, Neurology, etc." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">License Number *</label>
            <input type="text" name="licenseNumber" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Qualification</label>
            <input type="text" name="qualification" onChange={handleChange} placeholder="MBBS, MD, PhD" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
            <input type="text" name="experience" onChange={handleChange} placeholder="5+ years" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
            <input type="tel" name="phoneNumber" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
            <input type="text" name="department" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Consultation Fee</label>
            <input type="text" name="consultationFee" onChange={handleChange} placeholder="1500 BDT" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chamber Address</label>
            <input type="text" name="chamberAddress" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">Login Credentials</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Login Email *</label>
            <input type="email" name="loginEmail" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password *</label>
            <input type="password" name="loginPassword" required minLength={6} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700" />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
          <button type="button" onClick={() => navigate('/doctors')} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 transition">
            {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
            {loading ? 'Registering...' : 'Register Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistration;
