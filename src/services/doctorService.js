import api from './api';

export const getAllDoctors = async () => {
  const response = await api.get('/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};

export const registerDoctor = async (doctorData) => {
  const response = await api.post('/doctors/register', doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await api.put(`/doctors/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};

export const activateDoctor = async (id) => {
  const response = await api.post(`/doctors/${id}/activate`);
  return response.data;
};

export const deactivateDoctor = async (id) => {
  const response = await api.post(`/doctors/${id}/deactivate`);
  return response.data;
};

export const getDoctorCount = async () => {
  const response = await api.get('/doctors/count');
  return response.data;
};

export const getDoctorsBySpecialization = async (specialization) => {
  const response = await api.get(`/doctors/specialization/${specialization}`);
  return response.data;
};