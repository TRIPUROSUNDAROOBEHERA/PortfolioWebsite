import { describe, it, expect, vi, beforeEach } from 'vitest';
import contactApi from '../../src/api/contactApi';
import apiClient from '../../src/api/apiClient';

vi.mock('../../src/api/apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Contact API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sendMessage should send direct message payload to contact endpoint', async () => {
    const payload = { name: 'John Doe', email: 'john@example.com', message: 'Hello' };
    apiClient.post.mockResolvedValueOnce({ success: true, ...payload });

    const result = await contactApi.sendMessage(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/contact/', payload);
    expect(result?.success || result?.data?.success).toBe(true);
  });

  it('getAll should fetch submitted messages for admin view', async () => {
    const mockMessages = [{ id: 1, name: 'Alice', email: 'alice@test.com', message: 'Inquiry' }];
    apiClient.get.mockResolvedValueOnce(mockMessages);

    const result = await contactApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/contact/');
    expect(result).toEqual(mockMessages);
  });

  it('deleteMessage should trigger DELETE request with target message ID', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await contactApi.deleteMessage(1);
    expect(apiClient.delete).toHaveBeenCalledWith('/contact/1/');
  });
});