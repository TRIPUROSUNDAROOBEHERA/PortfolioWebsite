import apiClient from './apiClient';

export const educationApi = {
  getAll: () => apiClient.get('/education/'),
  getById: (id) => apiClient.get(`/education/${id}/`),
  create: (data) => apiClient.post('/education/', data),
  update: (id, data) => apiClient.put(`/education/${id}/`, data),
  delete: (id) => apiClient.delete(`/education/${id}/`),
};

export default educationApi;