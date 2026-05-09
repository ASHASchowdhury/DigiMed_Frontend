import api from './api';

export const getAllPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const registerPatient = async (patientData) => {
  const response = await api.post('/patients/register', patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await api.put(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

export const activatePatient = async (id) => {
  const response = await api.post(`/patients/${id}/activate`);
  return response.data;
};

export const deactivatePatient = async (id) => {
  const response = await api.post(`/patients/${id}/deactivate`);
  return response.data;
};

export const getPatientCount = async () => {
  const response = await api.get('/patients/count');
  return response.data;
};