const STORAGE_PREFIX = 'sr_portfolio_';

export const storageService = {
  get(key, defaultValue = null) {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove(key) {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear() {
    try {
      if (typeof window === 'undefined') return;
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
    } catch (error) {
      console.warn('Error clearing application storage:', error);
    }
  },

  // Direct Token Helpers
  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },

  setTokens({ access, refresh }) {
    if (access) localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
  },

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

export default storageService;