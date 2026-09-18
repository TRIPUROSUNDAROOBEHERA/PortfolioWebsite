import profileApi from '../api/profileApi';

const DEFAULT_PROFILE = {
  full_name: 'S. Ram Kumar',
  initials: 'SR',
  role: 'MCA Graduate | Software Developer',
  email: 'sramkumar0101@gmail.com',
  phone: '+91 98765 43210',
  location: 'India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  workspaceImg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
  bio: 'Passionate about building web applications and exploring new technologies. Love to solve real-world problems and contribute to impactful solutions.',
};

class ProfileStore {
  constructor() {
    this.state = {
      profile: DEFAULT_PROFILE,
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

  async fetchProfile() {
    this.setState({ loading: true, error: null });
    try {
      const res = await profileApi.getProfile();
      const data = Array.isArray(res) ? res[0] : res?.results ? res.results[0] : res;
      if (data && data.full_name) {
        this.setState({
          profile: { ...this.state.profile, ...data },
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
      return data;
    } catch (err) {
      this.setState({
        error: err?.message || 'Failed to fetch profile',
        loading: false,
      });
      return this.state.profile;
    }
  }

  async updateProfile(id, updatedData) {
    this.setState({ loading: true, error: null });
    try {
      const res = await profileApi.patchProfile(id, updatedData);
      this.setState({
        profile: { ...this.state.profile, ...res },
        loading: false,
      });
      return res;
    } catch (err) {
      this.setState({
        error: err?.message || 'Failed to update profile',
        loading: false,
      });
      throw err;
    }
  }
}

export const profileStore = new ProfileStore();
export default profileStore;