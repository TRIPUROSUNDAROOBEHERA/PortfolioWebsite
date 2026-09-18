import apiClient from './apiClient';

export const coursesApi = {
  getAll: () => apiClient.get('/courses/'),
  getById: (id) => apiClient.get(`/courses/${id}/`),
  create: (data) => apiClient.post('/courses/', data),
  update: (id, data) => apiClient.put(`/courses/${id}/`, data),
  delete: (id) => apiClient.delete(`/courses/${id}/`),
};

export default coursesApi;