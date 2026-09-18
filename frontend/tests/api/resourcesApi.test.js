import { describe, it, expect, vi, beforeEach } from 'vitest';
import resourcesApi from '../../src/api/resourcesApi';
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

describe('Resources API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should retrieve resource links catalog', async () => {
    const mockResources = [{ id: 1, title: 'DRF Documentation', type: 'Docs' }];
    apiClient.get.mockResolvedValueOnce(mockResources);

    const result = await resourcesApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/resources/');
    expect(result).toEqual(mockResources);
  });

  it('create should submit new resource object', async () => {
    const item = { title: 'Tailwind CSS Cheat Sheet', url: 'https://tailwindcss.com' };
    apiClient.post.mockResolvedValueOnce({ id: 4, ...item });

    const result = await resourcesApi.create(item);
    expect(apiClient.post).toHaveBeenCalledWith('/resources/', item);
    expect(result?.id || result?.data?.id).toBe(4);
  });

  it('delete should trigger delete for resource ID', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await resourcesApi.delete(4);
    expect(apiClient.delete).toHaveBeenCalledWith('/resources/4/');
  });
});