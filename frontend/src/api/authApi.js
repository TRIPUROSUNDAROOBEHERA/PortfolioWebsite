import apiClient from './apiClient';

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login/', credentials),
  register: (userData) => apiClient.post('/auth/register/', userData),
  refreshToken: (refresh) => apiClient.post('/auth/refresh/', { refresh }),
  getProfile: () => apiClient.get('/auth/user/'),
};

export default authApi;