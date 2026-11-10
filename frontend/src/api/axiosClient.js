import axios from 'axios';

// Resolve base URL safely:
// 1. If VITE_API_BASE_URL is specified (e.g., in production backend deployment), use it.
// 2. Otherwise default to same-origin '/api'.
// In local development, Vite dev server proxies '/api' to 'http://127.0.0.1:8000'.
// In production, same-origin '/api' prevents Chrome from triggering the Private Network Access prompt
// ("wants to access other apps and services on this device") when visiting via mobile/desktop.
const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return '/api';
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
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