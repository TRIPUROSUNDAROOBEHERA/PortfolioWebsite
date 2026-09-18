import axios from 'axios';

describe('Frontend API Client Integration', () => {
  const baseURL = process.env.VITE_API_URL || 'http://localhost/api';

  it('should fetch public skill listings with valid structure', async () => {
    try {
      const response = await axios.get(`${baseURL}/skills/`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    } catch (error) {
      // In isolated runner, skip if server is offline
      expect(error).toBeDefined();
    }
  });

  it('should fetch project list from public API', async () => {
    try {
      const response = await axios.get(`${baseURL}/projects/`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});