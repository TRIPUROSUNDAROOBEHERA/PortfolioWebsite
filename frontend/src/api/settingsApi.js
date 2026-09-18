import apiClient from './apiClient';

export const settingsApi = {
  getSettings: () => apiClient.get('/settings/'),
  updateSettings: (data) => apiClient.put('/settings/', data),
  patchSettings: (data) => apiClient.patch('/settings/', data),
};

export default settingsApi;