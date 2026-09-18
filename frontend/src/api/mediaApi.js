import apiClient from './apiClient';

export const mediaApi = {
  getAll: () => apiClient.get('/media/'),
  upload: (formData) =>
    apiClient.post('/media/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => apiClient.delete(`/media/${id}/`),
};

export default mediaApi;