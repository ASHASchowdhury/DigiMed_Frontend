// src/services/aiService.js
import api from './api';

export const analyzeSymptoms = async (symptoms, history, age, gender) => {
  try {
    const response = await api.post('/ai/analyze-symptoms', {
      symptoms,
      patientHistory: history,
      age,
      gender
    });
    return response.data;
  } catch (error) {
    // Return mock response if backend is not available
    return {
      analysis: `Based on the symptoms described (${symptoms}), it is recommended to consult with a healthcare provider. Common causes may include viral infection, stress, or seasonal allergies. Please monitor symptoms and seek medical attention if they persist or worsen.`
    };
  }
};

export const askMedicalQuestion = async (question) => {
  try {
    const response = await api.post('/ai/ask-question', { question });
    return response.data;
  } catch (error) {
    return {
      answer: `Thank you for your question about "${question}". This is a general medical inquiry. For specific medical advice, please consult with a qualified healthcare provider.`
    };
  }
};