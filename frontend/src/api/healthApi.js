import axiosClient from './axiosClient';

const healthApi = {
  getSystemHealth: async () => {
    const response = await axiosClient.get('/health/');
    return response.data;
  },
};

export default healthApi;