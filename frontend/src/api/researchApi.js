import apiClient from './apiClient';

export const researchApi = {
  getAll: () => apiClient.get('/research/'),
  getById: (id) => apiClient.get(`/research/${id}/`),
  create: (data) => apiClient.post('/research/', data),
  update: (id, data) => apiClient.put(`/research/${id}/`, data),
  delete: (id) => apiClient.delete(`/research/${id}/`),
};

export default researchApi;