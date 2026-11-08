import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-heal expired or invalid tokens from localStorage to prevent 401 errors on public endpoints
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete originalRequest.headers.Authorization;
      // If it's a GET request, retry without the stale token
      if (originalRequest.method === 'get') {
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;