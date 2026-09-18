import apiClient from './apiClient';

export const futurePlanApi = {
  getAll: () => apiClient.get('/future-plans/'),
  getById: (id) => apiClient.get(`/future-plans/${id}/`),
  create: (data) => apiClient.post('/future-plans/', data),
  update: (id, data) => apiClient.put(`/future-plans/${id}/`, data),
  delete: (id) => apiClient.delete(`/future-plans/${id}/`),
};

export default futurePlanApi;