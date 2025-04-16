
import axios from 'axios';

// Base API URL - in a real app this would be an environment variable
const API_URL = 'http://localhost:8000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('carePriceToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define our API services
export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('carePriceToken', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('carePriceToken');
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }
};

export const procedureService = {
  searchProcedures: async (params: any) => {
    try {
      const response = await api.get('/procedures/search', { params });
      return response.data;
    } catch (error) {
      console.error('Procedure search failed:', error);
      throw error;
    }
  },
  
  getProcedureById: async (id: string) => {
    try {
      const response = await api.get(`/procedures/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get procedure with ID ${id}:`, error);
      throw error;
    }
  },
  
  getDentalProcedures: async () => {
    try {
      const response = await api.get('/procedures');
      return response.data;
    } catch (error) {
      console.error('Failed to get dental procedures:', error);
      throw error;
    }
  }
};

export const dentistService = {
  searchDentists: async (params: any) => {
    try {
      const response = await api.get('/dentists/search', { params });
      return response.data;
    } catch (error) {
      console.error('Dentist search failed:', error);
      throw error;
    }
  },
  
  getDentistById: async (id: string) => {
    try {
      const response = await api.get(`/dentists/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get dentist with ID ${id}:`, error);
      throw error;
    }
  },
  
  registerPractice: async (practiceData: any) => {
    try {
      const response = await api.post('/dentists/practice', practiceData);
      return response.data;
    } catch (error) {
      console.error('Practice registration failed:', error);
      throw error;
    }
  },
  
  updatePractice: async (id: string, practiceData: any) => {
    try {
      const response = await api.put(`/dentists/practice/${id}`, practiceData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update practice with ID ${id}:`, error);
      throw error;
    }
  },
  
  uploadPricing: async (id: string, pricingData: any) => {
    try {
      const response = await api.post(`/dentists/practice/${id}/pricing`, pricingData);
      return response.data;
    } catch (error) {
      console.error(`Failed to upload pricing for practice with ID ${id}:`, error);
      throw error;
    }
  }
};

export const appointmentService = {
  getAvailability: async (dentistId: string, date: string) => {
    try {
      const response = await api.get(`/appointments/availability/${dentistId}`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get availability:', error);
      throw error;
    }
  },
  
  bookAppointment: async (appointmentData: any) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Appointment booking failed:', error);
      throw error;
    }
  },
  
  getPatientAppointments: async () => {
    try {
      const response = await api.get('/appointments/patient');
      return response.data;
    } catch (error) {
      console.error('Failed to get patient appointments:', error);
      throw error;
    }
  },
  
  getDentistAppointments: async () => {
    try {
      const response = await api.get('/appointments/dentist');
      return response.data;
    } catch (error) {
      console.error('Failed to get dentist appointments:', error);
      throw error;
    }
  },
  
  cancelAppointment: async (id: string) => {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to cancel appointment with ID ${id}:`, error);
      throw error;
    }
  }
};

export const financingService = {
  getFinancingOptions: async (dentistId: string) => {
    try {
      const response = await api.get(`/financing/${dentistId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get financing options:', error);
      throw error;
    }
  },
  
  checkEligibility: async (financingId: string, userData: any) => {
    try {
      const response = await api.post(`/financing/${financingId}/check-eligibility`, userData);
      return response.data;
    } catch (error) {
      console.error('Eligibility check failed:', error);
      throw error;
    }
  },
  
  applyForFinancing: async (financingId: string, applicationData: any) => {
    try {
      const response = await api.post(`/financing/${financingId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Financing application failed:', error);
      throw error;
    }
  }
};

export const reviewService = {
  getDentistReviews: async (dentistId: string) => {
    try {
      const response = await api.get(`/reviews/dentist/${dentistId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get dentist reviews:', error);
      throw error;
    }
  },
  
  submitReview: async (reviewData: any) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Review submission failed:', error);
      throw error;
    }
  }
};

export default api;
