import { describe, it, expect, vi, beforeEach } from 'vitest';
import publicationsApi from '../../src/api/publicationsApi';
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

describe('Publications API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should request publications list', async () => {
    const mockList = [{ id: 1, title: 'Distributed Systems in Python' }];
    apiClient.get.mockResolvedValueOnce(mockList);

    const result = await publicationsApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/publications/');
    expect(result).toEqual(mockList);
  });

  it('create should send new publication record', async () => {
    const pub = { title: 'Modern Full Stack Security', publisher: 'IEEE' };
    apiClient.post.mockResolvedValueOnce({ id: 3, ...pub });

    const result = await publicationsApi.create(pub);
    expect(apiClient.post).toHaveBeenCalledWith('/publications/', pub);
    expect(result?.id || result?.data?.id).toBe(3);
  });

  it('delete should request removal of publication', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await publicationsApi.delete(3);
    expect(apiClient.delete).toHaveBeenCalledWith('/publications/3/');
  });
});