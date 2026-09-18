import authApi from '../api/authApi';
import storageService from './storageService';

export const authService = {
  async login(credentials) {
    try {
      const data = await authApi.login(credentials);
      if (data?.access) {
        storageService.setTokens({
          access: data.access,
          refresh: data.refresh,
        });
      }
      return data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  async getProfile() {
    try {
      return await authApi.getProfile();
    } catch (error) {
      storageService.clearTokens();
      throw error;
    }
  },

  async refreshToken() {
    const refresh = storageService.getRefreshToken();
    if (!refresh) throw new Error('No refresh token available');

    try {
      const data = await authApi.refreshToken({ refresh });
      if (data?.access) {
        storageService.setTokens({ access: data.access });
      }
      return data;
    } catch (error) {
      storageService.clearTokens();
      throw error;
    }
  },

  logout() {
    storageService.clearTokens();
  },

  isAuthenticated() {
    return Boolean(storageService.getAccessToken());
  },
};

export default authService;