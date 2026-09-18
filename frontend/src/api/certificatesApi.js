import apiClient from './apiClient';

export const certificatesApi = {
  getAll: () => apiClient.get('/certificates/'),
  getById: (id) => apiClient.get(`/certificates/${id}/`),
  create: (data) => apiClient.post('/certificates/', data),
  update: (id, data) => apiClient.put(`/certificates/${id}/`, data),
  delete: (id) => apiClient.delete(`/certificates/${id}/`),
};

export default certificatesApi;