import apiClient from './apiClient';

export const achievementsApi = {
  getAll: () => apiClient.get('/achievements/'),
  getById: (id) => apiClient.get(`/achievements/${id}/`),
  create: (data) => apiClient.post('/achievements/', data),
  update: (id, data) => apiClient.put(`/achievements/${id}/`, data),
  delete: (id) => apiClient.delete(`/achievements/${id}/`),
};

export default achievementsApi;