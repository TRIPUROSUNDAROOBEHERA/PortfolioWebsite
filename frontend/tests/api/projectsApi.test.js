import { describe, it, expect, vi, beforeEach } from 'vitest';
import projectsApi from '../../src/api/projectsApi';
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

describe('Projects API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should retrieve all portfolio projects', async () => {
    const mockProjects = [{ id: 1, title: 'Portfolio Website', category: 'frontend' }];
    apiClient.get.mockResolvedValueOnce(mockProjects);

    const result = await projectsApi.getAll();
    expect(apiClient.get).toHaveBeenCalledWith('/projects/', expect.anything());
    expect(result).toEqual(mockProjects);
  });

  it('create should save a new project entry', async () => {
    const newProject = { title: 'Task Manager', category: 'fullstack', tags: ['React', 'Django'] };
    apiClient.post.mockResolvedValueOnce({ id: 10, ...newProject });

    const result = await projectsApi.create(newProject);
    expect(apiClient.post).toHaveBeenCalledWith('/projects/', newProject);
    expect(result?.id || result?.data?.id).toBe(10);
  });

  it('delete should remove project by id', async () => {
    apiClient.delete.mockResolvedValueOnce({ success: true });

    await projectsApi.delete(5);
    expect(apiClient.delete).toHaveBeenCalledWith('/projects/5/');
  });
});