import apiClient from './apiClient';

export const skillApi = {
  getAll: (params = {}) => apiClient.get('/skills/', { params }),
  getById: (id) => apiClient.get(`/skills/${id}/`),
  create: (data) => apiClient.post('/skills/', data),
  update: (id, data) => apiClient.put(`/skills/${id}/`, data),
  delete: (id) => apiClient.delete(`/skills/${id}/`),
};

export default skillApi;