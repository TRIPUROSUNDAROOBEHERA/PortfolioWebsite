import { describe, it, expect, vi, beforeEach } from 'vitest';
import researchApi from '../../src/api/researchApi';
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

describe('Research API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should fetch research articles', async () => {
    const mockResearch = [{ id: 1, topic: 'API Performance Optimization' }];
    apiClient.get.mockResolvedValueOnce(mockResearch);

    const result = await researchApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/research/');
    expect(result).toEqual(mockResearch);
  });

  it('create should send POST request for new research entry', async () => {
    const payload = { topic: 'Database Indexing Benchmarks', status: 'Completed' };
    apiClient.post.mockResolvedValueOnce({ id: 2, ...payload });

    const result = await researchApi.create(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/research/', payload);
    expect(result?.id || result?.data?.id).toBe(2);
  });

  it('delete should remove target research item', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await researchApi.delete(2);
    expect(apiClient.delete).toHaveBeenCalledWith('/research/2/');
  });
});