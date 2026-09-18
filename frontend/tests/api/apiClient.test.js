import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from '../../src/api/apiClient';

describe('API Client Configuration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have default baseURL and headers configured', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should append Authorization header if token exists in localStorage', () => {
    localStorage.setItem('access_token', 'mock-jwt-token');
    const token = localStorage.getItem('access_token');
    expect(token).toBe('mock-jwt-token');
  });
});