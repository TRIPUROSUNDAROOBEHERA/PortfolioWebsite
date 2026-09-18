import apiClient from './apiClient';

export const contactApi = {
  sendMessage: (data) => apiClient.post('/contact/', data),
  getAll: () => apiClient.get('/contact/'),
  deleteMessage: (id) => apiClient.delete(`/contact/${id}/`),
};

export default contactApi;