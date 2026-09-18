import apiClient from './apiClient';

export const notificationsApi = {
  getAll: () => apiClient.get('/notifications/'),
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/`, { is_read: true }),
  delete: (id) => apiClient.delete(`/notifications/${id}/`),
};

export default notificationsApi;