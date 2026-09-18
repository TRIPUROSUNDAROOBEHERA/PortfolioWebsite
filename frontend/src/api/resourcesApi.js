import apiClient from './apiClient';

export const resourcesApi = {
  getAll: () => apiClient.get('/resources/'),
  getById: (id) => apiClient.get(`/resources/${id}/`),
  create: (data) => apiClient.post('/resources/', data),
  update: (id, data) => apiClient.put(`/resources/${id}/`, data),
  delete: (id) => apiClient.delete(`/resources/${id}/`),
};

export default resourcesApi;