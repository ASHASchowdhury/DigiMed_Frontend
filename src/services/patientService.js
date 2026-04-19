import api from './api';

// Register new patient
export const registerPatient = async (patientData) => {
  try {
    // Transform form data to match backend expected format
    const requestBody = {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      dateOfBirth: patientData.dateOfBirth,
      gender: patientData.gender,
      bloodGroup: patientData.bloodGroup,
      phoneNumber: patientData.phoneNumber,
      alternatePhone: patientData.alternatePhone || '',
      email: patientData.email,
      addressLine1: patientData.addressLine1,
      addressLine2: patientData.addressLine2 || '',
      city: patientData.city,
      state: patientData.state,
      pincode: patientData.pincode,
      country: patientData.country || 'Bangladesh',
      emergencyContactName: patientData.emergencyContactName || '',
      emergencyContactNumber: patientData.emergencyContactNumber || '',
      emergencyContactRelation: patientData.emergencyContactRelation || '',
      medicalHistory: patientData.medicalHistory || 'None',
      allergies: patientData.allergies || 'None',
      currentMedications: patientData.currentMedications || 'None',
      loginEmail: patientData.loginEmail || patientData.email,
      loginPassword: patientData.loginPassword || 'default123'
    };
    
    console.log('📤 Registering patient:', requestBody);
    const response = await api.post('/patients/register', requestBody);
    console.log('📥 Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

// Get all patients
export const getAllPatients = async () => {
  try {
    console.log('📤 Fetching all patients');
    const response = await api.get('/patients');
    console.log('📥 Patients fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};

// Get patient by ID
export const getPatientById = async (id) => {
  try {
    console.log(`📤 Fetching patient with ID: ${id}`);
    const response = await api.get(`/patients/${id}`);
    console.log('📥 Patient fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Patient not found:', error);
    throw error;
  }
};

// Search patients by name
export const searchPatients = async (name) => {
  try {
    console.log(`📤 Searching patients by name: ${name}`);
    const response = await api.get(`/patients/search?name=${name}`);
    console.log('📥 Search results:', response.data);
    return response.data;
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

// Update patient
export const updatePatient = async (id, patientData) => {
  try {
    console.log(`📤 Updating patient ${id}:`, patientData);
    const response = await api.put(`/patients/${id}`, patientData);
    console.log('📥 Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};

// Delete patient
export const deletePatient = async (id) => {
  try {
    console.log(`📤 Deleting patient: ${id}`);
    const response = await api.delete(`/patients/${id}`);
    console.log('📥 Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};

// Get patient count
export const getPatientCount = async () => {
  try {
    console.log('📤 Fetching patient count');
    const response = await api.get('/patients/count');
    console.log('📥 Patient count:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get count:', error);
    throw error;
  }
};
