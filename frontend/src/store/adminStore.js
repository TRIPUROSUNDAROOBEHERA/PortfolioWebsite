import dashboardApi from '../api/dashboardApi';

class AdminStore {
  constructor() {
    this.state = {
      activeTab: 'dashboard',
      stats: {
        projectsCount: 10,
        skillsCount: 16,
        messagesCount: 4,
        blogsCount: 2,
        apiLatency: '24ms',
        uptime: '99.98%',
      },
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

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  async fetchStats() {
    this.setState({ loading: true, error: null });
    try {
      const res = await dashboardApi.getStats();
      if (res) {
        this.setState({
          stats: { ...this.state.stats, ...res },
          loading: false,
        });
      }
      return res;
    } catch (err) {
      this.setState({
        error: err?.message || 'Failed to fetch admin statistics',
        loading: false,
      });
      return this.state.stats;
    }
  }
}

export const adminStore = new AdminStore();
export default adminStore;