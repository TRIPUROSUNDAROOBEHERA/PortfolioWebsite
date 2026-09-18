import apiClient from './apiClient';

export const blogApi = {
  getAll: (params = {}) => apiClient.get('/blogs/', { params }),
  getBySlug: (slug) => apiClient.get(`/blogs/${slug}/`),
  create: (data) => apiClient.post('/blogs/', data),
  update: (id, data) => apiClient.put(`/blogs/${id}/`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}/`),
};

export default blogApi;