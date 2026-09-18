import { describe, it, expect, vi, beforeEach } from 'vitest';
import blogApi from '../../src/api/blogApi';
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

describe('Blog API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should fetch blog articles list', async () => {
    const mockBlogs = [{ id: 1, title: 'Building Django Backends', content: 'Sample text' }];
    apiClient.get.mockResolvedValueOnce(mockBlogs);

    const result = await blogApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/blogs/', expect.anything());
    expect(result).toEqual(mockBlogs);
  });

  it('create should send POST payload for new article', async () => {
    const newPost = { title: 'React 19 Hooks', content: 'Exploring actions' };
    apiClient.post.mockResolvedValueOnce({ id: 2, ...newPost });

    const result = await blogApi.create(newPost);
    expect(apiClient.post).toHaveBeenCalledWith('/blogs/', newPost);
    expect(result?.id || result?.data?.id).toBe(2);
  });

  it('delete should invoke DELETE method with id', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await blogApi.delete(1);
    expect(apiClient.delete).toHaveBeenCalledWith('/blogs/1/');
  });
});