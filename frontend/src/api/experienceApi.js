import apiClient from './apiClient';

export const experienceApi = {
  getAll: () => apiClient.get('/experience/'),
  getById: (id) => apiClient.get(`/experience/${id}/`),
  create: (data) => apiClient.post('/experience/', data),
  update: (id, data) => apiClient.put(`/experience/${id}/`, data),
  delete: (id) => apiClient.delete(`/experience/${id}/`),
};

export default experienceApi;