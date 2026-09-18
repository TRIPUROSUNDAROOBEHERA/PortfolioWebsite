import apiClient from './apiClient';

export const publicationsApi = {
  getAll: () => apiClient.get('/publications/'),
  getById: (id) => apiClient.get(`/publications/${id}/`),
  create: (data) => apiClient.post('/publications/', data),
  update: (id, data) => apiClient.put(`/publications/${id}/`, data),
  delete: (id) => apiClient.delete(`/publications/${id}/`),
};

export default publicationsApi;