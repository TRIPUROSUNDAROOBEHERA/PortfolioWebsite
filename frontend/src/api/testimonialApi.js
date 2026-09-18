import apiClient from './apiClient';

export const testimonialApi = {
  getAll: () => apiClient.get('/testimonials/'),
  getById: (id) => apiClient.get(`/testimonials/${id}/`),
  create: (data) => apiClient.post('/testimonials/', data),
  update: (id, data) => apiClient.put(`/testimonials/${id}/`, data),
  delete: (id) => apiClient.delete(`/testimonials/${id}/`),
};

export default testimonialApi;