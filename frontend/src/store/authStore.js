import authService from '../services/authService';

class AuthStore {
  constructor() {
    this.state = {
      user: null,
      isAuthenticated: authService.isAuthenticated(),
      loading: false,
      error: null,
    };
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  async login(credentials) {
    this.setState({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);
      this.setState({
        user: data?.user || { username: credentials.username },
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (err) {
      const errorMsg = err?.detail || err?.message || 'Login failed';
      this.setState({ error: errorMsg, loading: false });
      throw err;
    }
  }

  logout() {
    authService.logout();
    this.setState({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  }

  async checkAuthStatus() {
    if (!authService.isAuthenticated()) {
      this.setState({ isAuthenticated: false, user: null });
      return false;
    }

    this.setState({ loading: true });
    try {
      const user = await authService.getProfile();
      this.setState({
        user,
        isAuthenticated: true,
        loading: false,
      });
      return true;
    } catch {
      this.logout();
      this.setState({ loading: false });
      return false;
    }
  }
}

export const authStore = new AuthStore();
export default authStore;