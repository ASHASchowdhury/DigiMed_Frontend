import api from './api';

export const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments/book', appointmentData);
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.post(`/appointments/${id}/cancel`);
  return response.data;
};

export const completeAppointment = async (id) => {
  const response = await api.post(`/appointments/${id}/complete`);
  return response.data;
};

export const getAppointmentsByPatient = async (patientId) => {
  const response = await api.get(`/appointments/patient/${patientId}`);
  return response.data;
};

export const getAppointmentsByDoctor = async (doctorId) => {
  const response = await api.get(`/appointments/doctor/${doctorId}`);
  return response.data;
};

export const getAppointmentsByDoctorAndDate = async (doctorId, date) => {
  const response = await api.get(`/appointments/doctor/${doctorId}/date?date=${date}`);
  return response.data;
};