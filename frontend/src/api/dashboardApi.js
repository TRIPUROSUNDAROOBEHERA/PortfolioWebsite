import apiClient from './apiClient';

export const dashboardApi = {
  getStats: () => apiClient.get('/dashboard/stats/'),
  getOverview: () => apiClient.get('/dashboard/overview/'),
  getSystemHealth: () => apiClient.get('/dashboard/health/'),
};

export default dashboardApi;