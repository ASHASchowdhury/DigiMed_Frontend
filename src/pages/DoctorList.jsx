import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDoctors, deleteDoctor } from '../services/doctorService';
import { Stethoscope, Eye, Trash2, Plus, Search, Loader, Phone, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';


      {filteredDoctors.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <Stethoscope size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No doctors found</p>
          <Link to="/doctors/register" className="text-green-600 mt-2 inline-block">
            Add your first doctor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doctor.fullName}</h3>
                    <p className="text-sm text-green-100">{doctor.specialization}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="flex items-center gap-2 text-sm">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="text-gray-500">License:</span> {doctor.licenseNumber}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <span>{doctor.phoneNumber}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Status:</span> 
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doctor.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.status}
                  </span>
                </p>
              </div>
              <div className="border-t p-4 flex justify-between">
                <Link to={`/doctors/${doctor.id}`} className="flex items-center gap-2 text-green-600 hover:text-green-700">
                  <Eye size={18} /> View Profile
                </Link>
                <button onClick={() => handleDelete(doctor.id, doctor.fullName?.replace('Dr. ', ''))} className="text-red-600 hover:text-red-700">
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

export default DoctorList;