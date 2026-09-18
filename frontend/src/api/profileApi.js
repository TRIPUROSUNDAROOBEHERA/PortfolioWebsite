import apiClient from './apiClient';

export const profileApi = {
  getProfile: () => apiClient.get('/profile/'),
  updateProfile: (id, data) => apiClient.put(`/profile/${id}/`, data),
  patchProfile: (id, data) => apiClient.patch(`/profile/${id}/`, data),
};

export default profileApi;